import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { GetWordsQueryDto } from './dtos/get-words-query.dto';

const SEED_WORDS = [
  { word: 'take place',      word_form: 'verb phrase',  ipa: '/teɪk pleɪs/',             meaning: 'diễn ra',                        example: 'The meeting will take place in the main conference room.', sort_order: 1  },
  { word: 'attendee',        word_form: 'noun',          ipa: '/ˌæt.enˈdiː/',             meaning: 'người tham dự',                  example: 'All attendees must sign in at the front desk.', sort_order: 2  },
  { word: 'antique',         word_form: 'noun / adj',    ipa: '/ænˈtiːk/',                meaning: 'đồ cổ',                          example: 'The hotel lobby is decorated with antique furniture.', sort_order: 3  },
  { word: 'organization',    word_form: 'noun',          ipa: '/ˌɔːr.gən.aɪˈzeɪ.ʃən/',   meaning: 'tổ chức',                        example: 'She works for a nonprofit organization.', sort_order: 4  },
  { word: 'suspicious',      word_form: 'adjective',     ipa: '/səˈspɪʃ.əs/',             meaning: 'đáng ngờ',                       example: 'The manager found the report suspicious.', sort_order: 5  },
  { word: 'vary',            word_form: 'verb',          ipa: '/ˈver.i/',                 meaning: 'thay đổi, khác nhau',            example: 'Prices may vary depending on the season.', sort_order: 6  },
  { word: 'inventory',       word_form: 'noun',          ipa: '/ˈɪn.vən.tɔːr.i/',        meaning: 'hàng tồn kho',                   example: 'The store checks its inventory every month.', sort_order: 7  },
  { word: 'expand',          word_form: 'verb',          ipa: '/ɪkˈspænd/',               meaning: 'mở rộng',                        example: 'The company plans to expand its business overseas.', sort_order: 8  },
  { word: 'solicit',         word_form: 'verb',          ipa: '/səˈlɪs.ɪt/',              meaning: 'yêu cầu, kêu gọi',               example: 'The company solicited feedback from customers.', sort_order: 9  },
  { word: 'intend',          word_form: 'verb',          ipa: '/ɪnˈtend/',                meaning: 'có ý định',                      example: 'We intend to complete the project by June.', sort_order: 10 },
  { word: 'prevent',         word_form: 'verb',          ipa: '/prɪˈvent/',               meaning: 'ngăn chặn',                      example: 'This software helps prevent data loss.', sort_order: 11 },
  { word: 'aim',             word_form: 'verb / noun',   ipa: '/eɪm/',                    meaning: 'mục tiêu, nhắm đến',             example: 'The campaign aims to attract new clients.', sort_order: 12 },
  { word: 'qualified',       word_form: 'adjective',     ipa: '/ˈkwɑː.lə.faɪd/',         meaning: 'đủ trình độ',                    example: 'Only qualified applicants will be contacted.', sort_order: 13 },
  { word: 'resident',        word_form: 'noun',          ipa: '/ˈrez.ɪ.dənt/',            meaning: 'cư dân',                         example: 'Local residents attended the community meeting.', sort_order: 14 },
  { word: 'agreement',       word_form: 'noun',          ipa: '/əˈɡriː.mənt/',            meaning: 'hợp đồng, thỏa thuận',           example: 'Both sides signed the agreement yesterday.', sort_order: 15 },
  { word: 'opposition',      word_form: 'noun',          ipa: '/ˌɑː.pəˈzɪʃ.ən/',          meaning: 'sự phản đối',                    example: 'The proposal faced strong opposition.', sort_order: 16 },
  { word: 'extensive',       word_form: 'adjective',     ipa: '/ɪkˈsten.sɪv/',            meaning: 'rộng rãi, mở rộng',             example: 'The company conducted extensive market research.', sort_order: 17 },
  { word: 'guarantee',       word_form: 'verb / noun',   ipa: '/ˌɡær.ənˈtiː/',            meaning: 'bảo đảm',                        example: 'The product comes with a one-year guarantee.', sort_order: 18 },
  { word: 'supplier',        word_form: 'noun',          ipa: '/səˈplaɪ.ər/',             meaning: 'nhà cung cấp',                   example: 'We contacted a new supplier for office equipment.', sort_order: 19 },
  { word: 'landscaping',     word_form: 'noun',          ipa: '/ˈlænd.skeɪ.pɪŋ/',        meaning: 'thiết kế cảnh quan',             example: 'The company hired a firm for garden landscaping.', sort_order: 20 },
  { word: 'suggestion',      word_form: 'noun',          ipa: '/səˈdʒes.tʃən/',           meaning: 'đề xuất',                        example: 'We welcome any suggestions to improve customer service.', sort_order: 21 },
  { word: 'expertise',       word_form: 'noun',          ipa: '/ˌek.spɜːrˈtiːz/',        meaning: 'chuyên môn',                     example: 'She has expertise in financial reporting.', sort_order: 22 },
  { word: 'competitor',      word_form: 'noun',          ipa: '/kəmˈpet.ɪ.tər/',          meaning: 'đối thủ cạnh tranh',             example: 'The company is facing strong competitors in the market.', sort_order: 23 },
  { word: 'anniversary',     word_form: 'noun',          ipa: '/ˌæn.ɪˈvɜːr.sər.i/',      meaning: 'kỷ niệm',                        example: 'The firm celebrated its 10th anniversary last week.', sort_order: 24 },
  { word: 'dedication',      word_form: 'noun',          ipa: '/ˌded.ɪˈkeɪ.ʃən/',         meaning: 'sự cống hiến',                   example: 'Her dedication to work impressed the manager.', sort_order: 25 },
  { word: 'loyalty',         word_form: 'noun',          ipa: '/ˈlɔɪ.əl.ti/',             meaning: 'sự trung thành',                 example: 'Customer loyalty is important for long-term success.', sort_order: 26 },
  { word: 'contribute',      word_form: 'verb',          ipa: '/kənˈtrɪb.juːt/',          meaning: 'đóng góp',                       example: 'All staff are encouraged to contribute ideas.', sort_order: 27 },
  { word: 'gratitude',       word_form: 'noun',          ipa: '/ˈɡræt.ɪ.tuːd/',          meaning: 'lòng biết ơn',                   example: 'The director expressed his gratitude to the team.', sort_order: 28 },
  { word: 'refine',          word_form: 'verb',          ipa: '/rɪˈfaɪn/',                meaning: 'cải tiến',                       example: 'The design was refined after customer feedback.', sort_order: 29 },
  { word: 'spacious',        word_form: 'adjective',     ipa: '/ˈspeɪ.ʃəs/',             meaning: 'rộng rãi',                       example: 'The new office is bright and spacious.', sort_order: 30 },
  { word: 'go through',      word_form: 'phrasal verb',  ipa: '/ɡoʊ θruː/',               meaning: 'trải qua, xem xét',              example: 'Please go through the report carefully.', sort_order: 31 },
  { word: 'various',         word_form: 'adjective',     ipa: '/ˈver.i.əs/',              meaning: 'đa dạng',                        example: 'The seminar covers various business topics.', sort_order: 32 },
  { word: 'secure',          word_form: 'verb / adj',    ipa: '/sɪˈkjʊr/',                meaning: 'đảm bảo; an toàn',               example: 'The company hopes to secure more clients.', sort_order: 33 },
  { word: 'remove',          word_form: 'verb',          ipa: '/rɪˈmuːv/',                meaning: 'loại bỏ',                        example: 'Please remove outdated files from the system.', sort_order: 34 },
  { word: 'previous',        word_form: 'adjective',     ipa: '/ˈpriː.vi.əs/',            meaning: 'trước đó',                       example: 'Please refer to the previous email.', sort_order: 35 },
  { word: 'cooperation',     word_form: 'noun',          ipa: '/koʊˌɑː.pəˈreɪ.ʃən/',     meaning: 'sự hợp tác',                     example: 'Thank you for your cooperation.', sort_order: 36 },
  { word: 'upcoming',        word_form: 'adjective',     ipa: '/ˈʌpˌkʌm.ɪŋ/',            meaning: 'sắp tới',                        example: 'Details will be shared in the upcoming meeting.', sort_order: 37 },
  { word: 'charge',          word_form: 'verb / noun',   ipa: '/tʃɑːrdʒ/',                meaning: 'tính phí; phí',                  example: 'The hotel does not charge extra for breakfast.', sort_order: 38 },
  { word: 'assign',          word_form: 'verb',          ipa: '/əˈsaɪn/',                 meaning: 'phân công',                      example: 'The manager will assign tasks tomorrow.', sort_order: 39 },
  { word: 'administrator',   word_form: 'noun',          ipa: '/ədˈmɪn.ɪ.streɪ.tər/',    meaning: 'quản trị viên',                  example: 'Please contact the system administrator for help.', sort_order: 40 },
  { word: 'new hire',        word_form: 'noun',          ipa: '/nuː haɪr/',               meaning: 'nhân viên mới',                  example: 'The new hires will attend orientation on Monday.', sort_order: 41 },
  { word: 'promote',         word_form: 'verb',          ipa: '/prəˈmoʊt/',               meaning: 'thăng chức; quảng bá',           example: 'The company plans to promote the new service.', sort_order: 42 },
  { word: 'advertise',       word_form: 'verb',          ipa: '/ˈæd.vər.taɪz/',           meaning: 'quảng cáo',                      example: 'The product was advertised online.', sort_order: 43 },
  { word: 'coordinator',     word_form: 'noun',          ipa: '/koʊˈɔːr.də.neɪ.tər/',    meaning: 'người điều phối',                example: 'Please contact the event coordinator for details.', sort_order: 44 },
  { word: 'telescope',       word_form: 'noun',          ipa: '/ˈtel.ɪ.skoʊp/',           meaning: 'kính thiên văn',                 example: 'The museum displayed an old telescope.', sort_order: 45 },
  { word: 'revise',          word_form: 'verb',          ipa: '/rɪˈvaɪz/',                meaning: 'sửa đổi',                        example: 'The schedule has been revised.', sort_order: 46 },
  { word: 'representative',  word_form: 'noun',          ipa: '/ˌrep.rɪˈzen.tə.tɪv/',    meaning: 'đại diện',                       example: 'A sales representative visited our office.', sort_order: 47 },
  { word: 'inquiry',         word_form: 'noun',          ipa: '/ˈɪŋ.kwɪr.i/',             meaning: 'sự hỏi, yêu cầu thông tin',     example: 'We received an inquiry about pricing.', sort_order: 48 },
  { word: 'general',         word_form: 'adjective',     ipa: '/ˈdʒen.ər.əl/',            meaning: 'chung, tổng quát',               example: 'This email contains general information.', sort_order: 49 },
  { word: 'release',         word_form: 'verb / noun',   ipa: '/rɪˈliːs/',                meaning: 'phát hành',                      example: 'The company will release the report tomorrow.', sort_order: 50 },
  { word: 'indicate',        word_form: 'verb',          ipa: '/ˈɪn.dɪ.keɪt/',            meaning: 'chỉ ra, cho thấy',               example: 'The survey results indicate high satisfaction.', sort_order: 51 },
  { word: 'retain',          word_form: 'verb',          ipa: '/rɪˈteɪn/',                meaning: 'giữ lại',                        example: 'The company aims to retain skilled employees.', sort_order: 52 },
  { word: 'flavour',         word_form: 'noun',          ipa: '/ˈfleɪ.vər/',              meaning: 'hương vị',                       example: 'Customers can choose their preferred flavour.', sort_order: 53 },
  { word: 'sacrifice',       word_form: 'verb / noun',   ipa: '/ˈsæk.rɪ.faɪs/',          meaning: 'hy sinh',                        example: 'He sacrificed his time to finish the project.', sort_order: 54 },
  { word: 'obtain',          word_form: 'verb',          ipa: '/əbˈteɪn/',                meaning: 'đạt được, thu được',             example: 'You must obtain approval before ordering.', sort_order: 55 },
  { word: 'merger',          word_form: 'noun',          ipa: '/ˈmɜːr.dʒər/',             meaning: 'sự sáp nhập',                    example: 'The merger was announced last month.', sort_order: 56 },
  { word: 'nutritious',      word_form: 'adjective',     ipa: '/nuːˈtrɪʃ.əs/',            meaning: 'giàu dinh dưỡng',                example: 'The cafeteria offers nutritious meals.', sort_order: 57 },
  { word: 'individual',      word_form: 'noun / adj',    ipa: '/ˌɪn.dɪˈvɪdʒ.u.əl/',     meaning: 'cá nhân',                        example: 'Each individual employee has a login ID.', sort_order: 58 },
  { word: 'opportunity',     word_form: 'noun',          ipa: '/ˌɑː.pəˈtuː.nə.ti/',      meaning: 'cơ hội',                         example: 'This training is a great opportunity for staff.', sort_order: 59 },
  { word: 'substitute',      word_form: 'verb / noun',   ipa: '/ˈsʌb.stɪ.tuːt/',         meaning: 'thay thế',                       example: 'A temporary worker was hired to substitute her.', sort_order: 60 },
  { word: 'critical',        word_form: 'adjective',     ipa: '/ˈkrɪt.ɪ.kəl/',           meaning: 'mang tính phê bình; quan trọng', example: 'Time management is critical to success.', sort_order: 61 },
  { word: 'colleague',       word_form: 'noun',          ipa: '/ˈkɑː.liːɡ/',              meaning: 'đồng nghiệp',                    example: 'She discussed the issue with her colleagues.', sort_order: 62 },
  { word: 'courtesy',        word_form: 'noun',          ipa: '/ˈkɜː.tə.si/',             meaning: 'lịch sự, nhã nhặn',              example: 'Thank you for your courtesy and support.', sort_order: 63 },
  { word: 'get the word out', word_form: 'idiom',        ipa: '/ɡet ðə wɜːrd aʊt/',       meaning: 'truyền tin, thông báo rộng rãi', example: 'We used social media to get the word out.', sort_order: 64 },
  { word: 'install',         word_form: 'verb',          ipa: '/ɪnˈstɔːl/',               meaning: 'lắp đặt',                        example: 'The software will be installed this afternoon.', sort_order: 65 },
  { word: 'significant',     word_form: 'adjective',     ipa: '/sɪɡˈnɪf.ɪ.kənt/',        meaning: 'đáng kể, quan trọng',            example: 'There has been a significant increase in sales.', sort_order: 66 },
  { word: 'estimate',        word_form: 'verb / noun',   ipa: '/ˈes.tɪ.meɪt/',            meaning: 'ước tính',                       example: 'The contractor provided a cost estimate.', sort_order: 67 },
  { word: 'liaison',         word_form: 'noun',          ipa: '/lɪˈeɪ.zɑːn/',             meaning: 'người liên lạc',                 example: 'She acts as a liaison between departments.', sort_order: 68 },
  { word: 'successive',      word_form: 'adjective',     ipa: '/səkˈses.ɪv/',             meaning: 'liên tiếp',                      example: 'He arrived late for two successive meetings.', sort_order: 69 },
  { word: 'expert',          word_form: 'noun / adj',    ipa: '/ˈek.spɜːt/',              meaning: 'chuyên gia',                     example: 'Please consult an expert for advice.', sort_order: 70 },
  { word: 'diagnose',        word_form: 'verb',          ipa: '/ˈdaɪ.əɡ.noʊz/',          meaning: 'chẩn đoán',                      example: 'The technician will diagnose the system issue.', sort_order: 71 },
  { word: 'replace',         word_form: 'verb',          ipa: '/rɪˈpleɪs/',               meaning: 'thay thế',                       example: 'The company decided to replace the printer.', sort_order: 72 },
  { word: 'resemble',        word_form: 'verb',          ipa: '/rɪˈzem.bəl/',             meaning: 'giống',                          example: 'The new logo resembles the old design.', sort_order: 73 },
  { word: 'approve',         word_form: 'verb',          ipa: '/əˈpruːv/',                meaning: 'phê duyệt',                      example: 'The budget was approved by management.', sort_order: 74 },
  { word: 'inspection',      word_form: 'noun',          ipa: '/ɪnˈspek.ʃən/',            meaning: 'kiểm tra',                       example: 'The building passed the safety inspection.', sort_order: 75 },
  { word: 'proactive',       word_form: 'adjective',     ipa: '/proʊˈæk.tɪv/',            meaning: 'chủ động',                       example: 'We encourage proactive communication.', sort_order: 76 },
  { word: 'procedure',       word_form: 'noun',          ipa: '/prəˈsiː.dʒər/',           meaning: 'quy trình',                      example: 'Please follow the standard procedure.', sort_order: 77 },
  { word: 'compete',         word_form: 'verb',          ipa: '/kəmˈpiːt/',               meaning: 'cạnh tranh',                     example: 'Small businesses must compete effectively.', sort_order: 78 },
  { word: 'instrumental',    word_form: 'adjective',     ipa: '/ˌɪn.strəˈmen.təl/',       meaning: 'đóng vai trò quan trọng',        example: 'Her support was instrumental in the project.', sort_order: 79 },
  { word: 'combine',         word_form: 'verb',          ipa: '/kəmˈbaɪn/',               meaning: 'kết hợp',                        example: 'We plan to combine the two departments.', sort_order: 80 },
];

@Injectable()
export class WordsService implements OnModuleInit {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async onModuleInit() {
    const count = await this.wordRepository.count();
    if (count === 0) {
      const words = SEED_WORDS.map((w) =>
        this.wordRepository.create({ ...w, set_name: 'ETS_2026_TEST1' }),
      );
      await this.wordRepository.save(words);
    }
  }

  async findAll(set?: string): Promise<Word[]> {
    const qb = this.wordRepository
      .createQueryBuilder('w')
      .orderBy('w.sort_order', 'ASC');

    if (set) {
      qb.where('w.set_name = :set', { set });
    }

    return qb.getMany();
  }

  async findOne(id: string): Promise<Word> {
    const word = await this.wordRepository.findOne({ where: { id } });
    if (!word) throw new NotFoundException(`Word ${id} not found`);
    return word;
  }
}

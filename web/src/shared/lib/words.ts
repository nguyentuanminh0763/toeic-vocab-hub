export type { WordStatus } from '@/shared/types/study';
export type { StudyState } from '@/shared/types/study';

export interface Word {
  id: number;
  word: string;
  wordForm: string;
  ipa: string;
  meaning: string;
  example: string;
  setName: string;
  isPrivate?: boolean;
}

// ── Word sets registry ────────────────────────────────────────────────────
export const WORD_SETS = {
  ETS_2026_TEST1: { key: 'ETS_2026_TEST1', label: 'ETS 2026 — Test 1', count: 80 },
  ETS_2026_TEST2: { key: 'ETS_2026_TEST2', label: 'ETS 2026 — Test 2', count: 53 },
} as const;

export type WordSetKey = keyof typeof WORD_SETS;
export const DEFAULT_SET: WordSetKey = 'ETS_2026_TEST1';

export function getWordsBySet(set: string): Word[] {
  return words.filter((w) => w.setName === set);
}

// ── Raw data — each set is a separate array ───────────────────────────────
type RawWord = Omit<Word, 'setName'>;

const TEST1: RawWord[] = [
  { id: 1,  word: "take place",      wordForm: "verb phrase",   ipa: "/teɪk pleɪs/",             meaning: "diễn ra",                         example: "The meeting will take place in the main conference room." },
  { id: 2,  word: "attendee",        wordForm: "noun",          ipa: "/ˌæt.enˈdiː/",             meaning: "người tham dự",                   example: "All attendees must sign in at the front desk." },
  { id: 3,  word: "antique",         wordForm: "noun / adj",    ipa: "/ænˈtiːk/",                meaning: "đồ cổ",                           example: "The hotel lobby is decorated with antique furniture." },
  { id: 4,  word: "organization",    wordForm: "noun",          ipa: "/ˌɔːr.gən.aɪˈzeɪ.ʃən/",   meaning: "tổ chức",                         example: "She works for a nonprofit organization." },
  { id: 5,  word: "suspicious",      wordForm: "adjective",     ipa: "/səˈspɪʃ.əs/",             meaning: "đáng ngờ",                        example: "The manager found the report suspicious." },
  { id: 6,  word: "vary",            wordForm: "verb",          ipa: "/ˈver.i/",                 meaning: "thay đổi, khác nhau",             example: "Prices may vary depending on the season." },
  { id: 7,  word: "inventory",       wordForm: "noun",          ipa: "/ˈɪn.vən.tɔːr.i/",        meaning: "hàng tồn kho",                    example: "The store checks its inventory every month." },
  { id: 8,  word: "expand",          wordForm: "verb",          ipa: "/ɪkˈspænd/",               meaning: "mở rộng",                         example: "The company plans to expand its business overseas." },
  { id: 9,  word: "solicit",         wordForm: "verb",          ipa: "/səˈlɪs.ɪt/",              meaning: "yêu cầu, kêu gọi",                example: "The company solicited feedback from customers." },
  { id: 10, word: "intend",          wordForm: "verb",          ipa: "/ɪnˈtend/",                meaning: "có ý định",                       example: "We intend to complete the project by June." },
  { id: 11, word: "prevent",         wordForm: "verb",          ipa: "/prɪˈvent/",               meaning: "ngăn chặn",                       example: "This software helps prevent data loss." },
  { id: 12, word: "aim",             wordForm: "verb / noun",   ipa: "/eɪm/",                    meaning: "mục tiêu, nhắm đến",              example: "The campaign aims to attract new clients." },
  { id: 13, word: "qualified",       wordForm: "adjective",     ipa: "/ˈkwɑː.lə.faɪd/",         meaning: "đủ trình độ",                     example: "Only qualified applicants will be contacted." },
  { id: 14, word: "resident",        wordForm: "noun",          ipa: "/ˈrez.ɪ.dənt/",            meaning: "cư dân",                          example: "Local residents attended the community meeting." },
  { id: 15, word: "agreement",       wordForm: "noun",          ipa: "/əˈɡriː.mənt/",            meaning: "hợp đồng, thỏa thuận",            example: "Both sides signed the agreement yesterday." },
  { id: 16, word: "opposition",      wordForm: "noun",          ipa: "/ˌɑː.pəˈzɪʃ.ən/",          meaning: "sự phản đối",                     example: "The proposal faced strong opposition." },
  { id: 17, word: "extensive",       wordForm: "adjective",     ipa: "/ɪkˈsten.sɪv/",            meaning: "rộng rãi, mở rộng",               example: "The company conducted extensive market research." },
  { id: 18, word: "guarantee",       wordForm: "verb / noun",   ipa: "/ˌɡær.ənˈtiː/",            meaning: "bảo đảm",                         example: "The product comes with a one-year guarantee." },
  { id: 19, word: "supplier",        wordForm: "noun",          ipa: "/səˈplaɪ.ər/",             meaning: "nhà cung cấp",                    example: "We contacted a new supplier for office equipment." },
  { id: 20, word: "landscaping",     wordForm: "noun",          ipa: "/ˈlænd.skeɪ.pɪŋ/",        meaning: "thiết kế cảnh quan",              example: "The company hired a firm for garden landscaping." },
  { id: 21, word: "suggestion",      wordForm: "noun",          ipa: "/səˈdʒes.tʃən/",           meaning: "đề xuất",                         example: "We welcome any suggestions to improve customer service." },
  { id: 22, word: "expertise",       wordForm: "noun",          ipa: "/ˌek.spɜːrˈtiːz/",        meaning: "chuyên môn",                      example: "She has expertise in financial reporting." },
  { id: 23, word: "competitor",      wordForm: "noun",          ipa: "/kəmˈpet.ɪ.tər/",          meaning: "đối thủ cạnh tranh",              example: "The company is facing strong competitors in the market." },
  { id: 24, word: "anniversary",     wordForm: "noun",          ipa: "/ˌæn.ɪˈvɜːr.sər.i/",      meaning: "kỷ niệm",                         example: "The firm celebrated its 10th anniversary last week." },
  { id: 25, word: "dedication",      wordForm: "noun",          ipa: "/ˌded.ɪˈkeɪ.ʃən/",         meaning: "sự cống hiến",                    example: "Her dedication to work impressed the manager." },
  { id: 26, word: "loyalty",         wordForm: "noun",          ipa: "/ˈlɔɪ.əl.ti/",             meaning: "sự trung thành",                  example: "Customer loyalty is important for long-term success." },
  { id: 27, word: "contribute",      wordForm: "verb",          ipa: "/kənˈtrɪb.juːt/",          meaning: "đóng góp",                        example: "All staff are encouraged to contribute ideas." },
  { id: 28, word: "gratitude",       wordForm: "noun",          ipa: "/ˈɡræt.ɪ.tuːd/",          meaning: "lòng biết ơn",                    example: "The director expressed his gratitude to the team." },
  { id: 29, word: "refine",          wordForm: "verb",          ipa: "/rɪˈfaɪn/",                meaning: "cải tiến",                        example: "The design was refined after customer feedback." },
  { id: 30, word: "spacious",        wordForm: "adjective",     ipa: "/ˈspeɪ.ʃəs/",             meaning: "rộng rãi",                        example: "The new office is bright and spacious." },
  { id: 31, word: "go through",      wordForm: "phrasal verb",  ipa: "/ɡoʊ θruː/",               meaning: "trải qua, xem xét",               example: "Please go through the report carefully." },
  { id: 32, word: "various",         wordForm: "adjective",     ipa: "/ˈver.i.əs/",              meaning: "đa dạng",                         example: "The seminar covers various business topics." },
  { id: 33, word: "secure",          wordForm: "verb / adj",    ipa: "/sɪˈkjʊr/",                meaning: "đảm bảo; an toàn",                example: "The company hopes to secure more clients." },
  { id: 34, word: "remove",          wordForm: "verb",          ipa: "/rɪˈmuːv/",                meaning: "loại bỏ",                         example: "Please remove outdated files from the system." },
  { id: 35, word: "previous",        wordForm: "adjective",     ipa: "/ˈpriː.vi.əs/",            meaning: "trước đó",                        example: "Please refer to the previous email." },
  { id: 36, word: "cooperation",     wordForm: "noun",          ipa: "/koʊˌɑː.pəˈreɪ.ʃən/",     meaning: "sự hợp tác",                      example: "Thank you for your cooperation." },
  { id: 37, word: "upcoming",        wordForm: "adjective",     ipa: "/ˈʌpˌkʌm.ɪŋ/",            meaning: "sắp tới",                         example: "Details will be shared in the upcoming meeting." },
  { id: 38, word: "charge",          wordForm: "verb / noun",   ipa: "/tʃɑːrdʒ/",                meaning: "tính phí; phí",                   example: "The hotel does not charge extra for breakfast." },
  { id: 39, word: "assign",          wordForm: "verb",          ipa: "/əˈsaɪn/",                 meaning: "phân công",                       example: "The manager will assign tasks tomorrow." },
  { id: 40, word: "administrator",   wordForm: "noun",          ipa: "/ədˈmɪn.ɪ.streɪ.tər/",    meaning: "quản trị viên",                   example: "Please contact the system administrator for help." },
  { id: 41, word: "new hire",        wordForm: "noun",          ipa: "/nuː haɪr/",               meaning: "nhân viên mới",                   example: "The new hires will attend orientation on Monday." },
  { id: 42, word: "promote",         wordForm: "verb",          ipa: "/prəˈmoʊt/",               meaning: "thăng chức; quảng bá",            example: "The company plans to promote the new service." },
  { id: 43, word: "advertise",       wordForm: "verb",          ipa: "/ˈæd.vər.taɪz/",           meaning: "quảng cáo",                       example: "The product was advertised online." },
  { id: 44, word: "coordinator",     wordForm: "noun",          ipa: "/koʊˈɔːr.də.neɪ.tər/",    meaning: "người điều phối",                 example: "Please contact the event coordinator for details." },
  { id: 45, word: "telescope",       wordForm: "noun",          ipa: "/ˈtel.ɪ.skoʊp/",           meaning: "kính thiên văn",                  example: "The museum displayed an old telescope." },
  { id: 46, word: "revise",          wordForm: "verb",          ipa: "/rɪˈvaɪz/",                meaning: "sửa đổi",                         example: "The schedule has been revised." },
  { id: 47, word: "representative",  wordForm: "noun",          ipa: "/ˌrep.rɪˈzen.tə.tɪv/",    meaning: "đại diện",                        example: "A sales representative visited our office." },
  { id: 48, word: "inquiry",         wordForm: "noun",          ipa: "/ˈɪŋ.kwɪr.i/",             meaning: "sự hỏi, yêu cầu thông tin",       example: "We received an inquiry about pricing." },
  { id: 49, word: "general",         wordForm: "adjective",     ipa: "/ˈdʒen.ər.əl/",            meaning: "chung, tổng quát",                example: "This email contains general information." },
  { id: 50, word: "release",         wordForm: "verb / noun",   ipa: "/rɪˈliːs/",                meaning: "phát hành",                       example: "The company will release the report tomorrow." },
  { id: 51, word: "indicate",        wordForm: "verb",          ipa: "/ˈɪn.dɪ.keɪt/",            meaning: "chỉ ra, cho thấy",                example: "The survey results indicate high satisfaction." },
  { id: 52, word: "retain",          wordForm: "verb",          ipa: "/rɪˈteɪn/",                meaning: "giữ lại",                         example: "The company aims to retain skilled employees." },
  { id: 53, word: "flavour",         wordForm: "noun",          ipa: "/ˈfleɪ.vər/",              meaning: "hương vị",                        example: "Customers can choose their preferred flavour." },
  { id: 54, word: "sacrifice",       wordForm: "verb / noun",   ipa: "/ˈsæk.rɪ.faɪs/",          meaning: "hy sinh",                         example: "He sacrificed his time to finish the project." },
  { id: 55, word: "obtain",          wordForm: "verb",          ipa: "/əbˈteɪn/",                meaning: "đạt được, thu được",              example: "You must obtain approval before ordering." },
  { id: 56, word: "merger",          wordForm: "noun",          ipa: "/ˈmɜːr.dʒər/",             meaning: "sự sáp nhập",                     example: "The merger was announced last month." },
  { id: 57, word: "nutritious",      wordForm: "adjective",     ipa: "/nuːˈtrɪʃ.əs/",            meaning: "giàu dinh dưỡng",                 example: "The cafeteria offers nutritious meals." },
  { id: 58, word: "individual",      wordForm: "noun / adj",    ipa: "/ˌɪn.dɪˈvɪdʒ.u.əl/",     meaning: "cá nhân",                         example: "Each individual employee has a login ID." },
  { id: 59, word: "opportunity",     wordForm: "noun",          ipa: "/ˌɑː.pəˈtuː.nə.ti/",      meaning: "cơ hội",                          example: "This training is a great opportunity for staff." },
  { id: 60, word: "substitute",      wordForm: "verb / noun",   ipa: "/ˈsʌb.stɪ.tuːt/",         meaning: "thay thế",                        example: "A temporary worker was hired to substitute her." },
  { id: 61, word: "critical",        wordForm: "adjective",     ipa: "/ˈkrɪt.ɪ.kəl/",           meaning: "mang tính phê bình; quan trọng",  example: "Time management is critical to success." },
  { id: 62, word: "colleague",       wordForm: "noun",          ipa: "/ˈkɑː.liːɡ/",              meaning: "đồng nghiệp",                     example: "She discussed the issue with her colleagues." },
  { id: 63, word: "courtesy",        wordForm: "noun",          ipa: "/ˈkɜː.tə.si/",             meaning: "lịch sự, nhã nhặn",               example: "Thank you for your courtesy and support." },
  { id: 64, word: "get the word out",wordForm: "idiom",         ipa: "/ɡet ðə wɜːrd aʊt/",       meaning: "truyền tin, thông báo rộng rãi",  example: "We used social media to get the word out." },
  { id: 65, word: "install",         wordForm: "verb",          ipa: "/ɪnˈstɔːl/",               meaning: "lắp đặt",                         example: "The software will be installed this afternoon." },
  { id: 66, word: "significant",     wordForm: "adjective",     ipa: "/sɪɡˈnɪf.ɪ.kənt/",        meaning: "đáng kể, quan trọng",             example: "There has been a significant increase in sales." },
  { id: 67, word: "estimate",        wordForm: "verb / noun",   ipa: "/ˈes.tɪ.meɪt/",            meaning: "ước tính",                        example: "The contractor provided a cost estimate." },
  { id: 68, word: "liaison",         wordForm: "noun",          ipa: "/lɪˈeɪ.zɑːn/",             meaning: "người liên lạc",                  example: "She acts as a liaison between departments." },
  { id: 69, word: "successive",      wordForm: "adjective",     ipa: "/səkˈses.ɪv/",             meaning: "liên tiếp",                       example: "He arrived late for two successive meetings." },
  { id: 70, word: "expert",          wordForm: "noun / adj",    ipa: "/ˈek.spɜːt/",              meaning: "chuyên gia",                      example: "Please consult an expert for advice." },
  { id: 71, word: "diagnose",        wordForm: "verb",          ipa: "/ˈdaɪ.əɡ.noʊz/",          meaning: "chẩn đoán",                       example: "The technician will diagnose the system issue." },
  { id: 72, word: "replace",         wordForm: "verb",          ipa: "/rɪˈpleɪs/",               meaning: "thay thế",                        example: "The company decided to replace the printer." },
  { id: 73, word: "resemble",        wordForm: "verb",          ipa: "/rɪˈzem.bəl/",             meaning: "giống",                           example: "The new logo resembles the old design." },
  { id: 74, word: "approve",         wordForm: "verb",          ipa: "/əˈpruːv/",                meaning: "phê duyệt",                       example: "The budget was approved by management." },
  { id: 75, word: "inspection",      wordForm: "noun",          ipa: "/ɪnˈspek.ʃən/",            meaning: "kiểm tra",                        example: "The building passed the safety inspection." },
  { id: 76, word: "proactive",       wordForm: "adjective",     ipa: "/proʊˈæk.tɪv/",            meaning: "chủ động",                        example: "We encourage proactive communication." },
  { id: 77, word: "procedure",       wordForm: "noun",          ipa: "/prəˈsiː.dʒər/",           meaning: "quy trình",                       example: "Please follow the standard procedure." },
  { id: 78, word: "compete",         wordForm: "verb",          ipa: "/kəmˈpiːt/",               meaning: "cạnh tranh",                      example: "Small businesses must compete effectively." },
  { id: 79, word: "instrumental",    wordForm: "adjective",     ipa: "/ˌɪn.strəˈmen.təl/",       meaning: "đóng vai trò quan trọng",         example: "Her support was instrumental in the project." },
  { id: 80, word: "combine",         wordForm: "verb",          ipa: "/kəmˈbaɪn/",               meaning: "kết hợp",                         example: "We plan to combine the two departments." },
];

// ── ETS 2026 Test 2 ───────────────────────────────────────────────────────
const TEST2: RawWord[] = [
  { id: 81,  word: "reliability",   wordForm: "noun",              ipa: "/rɪˌlaɪ.əˈbɪl.ə.ti/",    meaning: "sự đáng tin cậy",              example: "The system is known for its reliability." },
  { id: 82,  word: "reimbursement", wordForm: "noun",              ipa: "/ˌriː.ɪmˈbɜːs.mənt/",     meaning: "sự hoàn tiền",                 example: "Employees can request travel reimbursement." },
  { id: 83,  word: "accept",        wordForm: "verb",              ipa: "/əkˈsept/",                meaning: "chấp nhận",                    example: "She accepted the job offer." },
  { id: 84,  word: "candidate",     wordForm: "noun",              ipa: "/ˈkæn.dɪ.deɪt/",          meaning: "ứng viên",                     example: "Each candidate was interviewed." },
  { id: 85,  word: "master",        wordForm: "verb",              ipa: "/ˈmæs.tər/",               meaning: "nắm vững, thành thạo",         example: "He mastered the new software quickly." },
  { id: 86,  word: "power failure", wordForm: "noun phrase",       ipa: "/ˈpaʊ.ər ˌfeɪl.jər/",     meaning: "sự mất điện",                  example: "The meeting was delayed due to a power failure." },
  { id: 87,  word: "property",      wordForm: "noun",              ipa: "/ˈprɒː.pər.ti/",           meaning: "tài sản, bất động sản",        example: "The company owns several properties downtown." },
  { id: 88,  word: "strategy",      wordForm: "noun",              ipa: "/ˈstræt.ə.dʒi/",           meaning: "chiến lược",                   example: "Marketing strategy is key to growth." },
  { id: 89,  word: "name",          wordForm: "verb",              ipa: "/neɪm/",                   meaning: "chỉ định, bổ nhiệm",           example: "She was named team leader." },
  { id: 90,  word: "warranty",      wordForm: "noun",              ipa: "/ˈwɒr.ən.ti/",             meaning: "bảo hành",                     example: "The product comes with a one-year warranty." },
  { id: 91,  word: "workplace",     wordForm: "noun",              ipa: "/ˈwɜːk.pleɪs/",            meaning: "nơi làm việc",                 example: "Safety is important in the workplace." },
  { id: 92,  word: "postpone",      wordForm: "verb",              ipa: "/poʊstˈpoʊn/",             meaning: "hoãn lại",                     example: "The event was postponed until next week." },
  { id: 93,  word: "struggle",      wordForm: "verb",              ipa: "/ˈstrʌŋ.əl/",              meaning: "vật lộn, gặp khó khăn",        example: "The team struggled to meet the deadline." },
  { id: 94,  word: "ingredient",    wordForm: "noun",              ipa: "/ɪnˈɡriː.di.ənt/",         meaning: "thành phần",                   example: "Fresh ingredients are used in the cafeteria." },
  { id: 95,  word: "savory",        wordForm: "adjective",         ipa: "/ˈseɪ.vər.i/",             meaning: "mặn, đậm vị",                  example: "The restaurant offers savory lunch options." },
  { id: 96,  word: "eager",         wordForm: "adjective",         ipa: "/ˈiː.ɡər/",                meaning: "háo hức, mong muốn",           example: "She is eager to learn new skills." },
  { id: 97,  word: "artificial",    wordForm: "adjective",         ipa: "/ˌɑːr.tɪˈfɪʃ.əl/",        meaning: "nhân tạo",                     example: "The room uses artificial lighting." },
  { id: 98,  word: "substance",     wordForm: "noun",              ipa: "/ˈsʌb.stəns/",             meaning: "chất, vật chất",               example: "The report lacks useful substance." },
  { id: 99,  word: "handy",         wordForm: "adjective",         ipa: "/ˈhæn.di/",                meaning: "tiện lợi",                     example: "This app is very handy for work." },
  { id: 100, word: "effective",     wordForm: "adjective",         ipa: "/ɪˈfek.tɪv/",              meaning: "hiệu quả",                     example: "The new system is more effective." },
  { id: 101, word: "sustainable",   wordForm: "adjective",         ipa: "/səˈsteɪ.nə.bl/",          meaning: "bền vững",                     example: "The company aims for sustainable growth." },
  { id: 102, word: "address",       wordForm: "verb",              ipa: "/əˈdrɛs/",                 meaning: "giải quyết",                   example: "We need to address customer complaints quickly." },
  { id: 103, word: "porous",        wordForm: "adjective",         ipa: "/ˈpɔːr.əs/",               meaning: "xốp, thấm nước",               example: "This material is too porous for outdoor use." },
  { id: 104, word: "subscription",  wordForm: "noun",              ipa: "/səbˈskrɪp.ʃən/",          meaning: "sự đăng ký, thuê bao",         example: "She bought a one-year magazine subscription." },
  { id: 105, word: "access",        wordForm: "noun / verb",       ipa: "/ˈæk.ses/",                meaning: "quyền truy cập / truy cập",    example: "Employees can access the system online." },
  { id: 106, word: "valid",         wordForm: "adjective",         ipa: "/ˈvæl.ɪd/",                meaning: "hợp lệ, còn hiệu lực",         example: "Your ticket is valid until Friday." },
  { id: 107, word: "expire",        wordForm: "verb",              ipa: "/ɪkˈspaɪər/",              meaning: "hết hạn",                      example: "The contract will expire next month." },
  { id: 108, word: "activate",      wordForm: "verb",              ipa: "/ˈæk.tɪ.veɪt/",            meaning: "kích hoạt",                    example: "Please activate your card before use." },
  { id: 109, word: "distribute",    wordForm: "verb",              ipa: "/dɪˈstrɪb.juːt/",          meaning: "phân phối",                    example: "The company distributes products nationwide." },
  { id: 110, word: "feature",       wordForm: "noun / verb",       ipa: "/ˈfiː.tʃər/",              meaning: "tính năng / có đặc điểm",      example: "This phone features a large screen." },
  { id: 111, word: "reveal",        wordForm: "verb",              ipa: "/rɪˈviːl/",                meaning: "tiết lộ",                      example: "The report revealed a drop in sales." },
  { id: 112, word: "extension",     wordForm: "noun",              ipa: "/ɪkˈsten.ʃən/",            meaning: "sự gia hạn, số máy lẻ",        example: "He asked for an extension of the deadline." },
  { id: 113, word: "complaint",     wordForm: "noun",              ipa: "/kəmˈpleɪnt/",             meaning: "lời phàn nàn",                 example: "We received a complaint from a customer." },
  { id: 114, word: "issue",         wordForm: "noun / verb",       ipa: "/ˈɪʃ.uː/",                 meaning: "vấn đề / phát hành",           example: "This is a serious safety issue." },
  { id: 115, word: "maintenance",   wordForm: "noun",              ipa: "/ˈmeɪn.tən.əns/",          meaning: "bảo trì",                      example: "The machine needs regular maintenance." },
  { id: 116, word: "summarize",     wordForm: "verb",              ipa: "/ˈsʌm.ər.aɪz/",            meaning: "tóm tắt",                      example: "Please summarize the meeting notes." },
  { id: 117, word: "notify",        wordForm: "verb",              ipa: "/ˈnoʊ.tɪ.faɪ/",            meaning: "thông báo",                    example: "We will notify you by email." },
  { id: 118, word: "requirement",   wordForm: "noun",              ipa: "/rɪˈkwaɪər.mənt/",         meaning: "yêu cầu, điều kiện",           example: "Experience is a job requirement." },
  { id: 119, word: "freight",       wordForm: "noun",              ipa: "/freɪt/",                  meaning: "hàng hóa vận chuyển",          example: "Freight costs have increased this year." },
  { id: 120, word: "vehicle",       wordForm: "noun",              ipa: "/ˈviː.ə.kl/",              meaning: "phương tiện, xe cộ",           example: "Company vehicles are parked outside." },
  { id: 121, word: "transport",     wordForm: "verb / noun",       ipa: "/ˈtræns.pɔːrt/",           meaning: "vận chuyển / sự vận chuyển",   example: "The goods are transported by truck." },
  { id: 122, word: "nationwide",    wordForm: "adverb / adjective",ipa: "/ˌneɪ.ʃənˈwaɪd/",          meaning: "trên toàn quốc",               example: "The service is available nationwide." },
  { id: 123, word: "executive",     wordForm: "noun / adjective",  ipa: "/ɪɡˈzek.jə.tɪv/",          meaning: "giám đốc, lãnh đạo / điều hành", example: "The executive discussed company strategy." },
  { id: 124, word: "commercial",    wordForm: "adjective",         ipa: "/kəˈmɜːr.ʃəl/",            meaning: "thương mại",                   example: "This is a commercial building." },
  { id: 125, word: "demand",        wordForm: "noun / verb",       ipa: "/dɪˈmɑːnd/",               meaning: "nhu cầu / yêu cầu",            example: "There is high demand for this product." },
  { id: 126, word: "specialty",     wordForm: "noun",              ipa: "/ˈspeʃ.əl.ti/",            meaning: "chuyên môn, lĩnh vực đặc biệt", example: "Marketing is her specialty." },
  { id: 127, word: "convert",       wordForm: "verb",              ipa: "/kənˈvɜːrt/",              meaning: "chuyển đổi",                   example: "They converted the office into a meeting room." },
  { id: 128, word: "virtual",       wordForm: "adjective",         ipa: "/ˈvɜːr.tʃu.əl/",           meaning: "ảo, trực tuyến",               example: "The team held a virtual meeting." },
  { id: 129, word: "visualization", wordForm: "noun",              ipa: "/ˌvɪʒ.u.ə.laɪˈzeɪ.ʃən/",  meaning: "sự trực quan hóa",             example: "Data visualization helps explain results." },
  { id: 130, word: "suggest",       wordForm: "verb",              ipa: "/səˈdʒest/",               meaning: "đề xuất",                      example: "I suggest starting the project early." },
  { id: 131, word: "curate",        wordForm: "verb",              ipa: "/kjuˈreɪt/",               meaning: "tuyển chọn, chọn lọc",         example: "She curates content for the website." },
  { id: 132, word: "highlight",     wordForm: "verb / noun",       ipa: "/ˈhaɪ.laɪt/",              meaning: "làm nổi bật / điểm nổi bật",  example: "The report highlights key problems." },
  { id: 133, word: "process",       wordForm: "verb / noun",       ipa: "/ˈproʊ.ses/",              meaning: "xử lý / quy trình",            example: "We process orders within 24 hours." },
];

// ── Merged word list ──────────────────────────────────────────────────────
export const words: Word[] = [
  ...TEST1.map((w) => ({ ...w, setName: 'ETS_2026_TEST1' })),
  ...TEST2.map((w) => ({ ...w, setName: 'ETS_2026_TEST2' })),
];

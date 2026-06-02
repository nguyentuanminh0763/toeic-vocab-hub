export type { WordStatus } from '@/shared/types/study';
export type { StudyState } from '@/shared/types/study';

export interface Word {
  id: number;
  word: string;
  wordForm: string;
  ipa: string;
  meaning: string;
  example: string;
}

export const words: Word[] = [
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

export const STORAGE_KEY = 'toeic_test1_progress_v2';

import type { StudyState } from '@/shared/types/study';

export function loadStudyState(): StudyState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudyState) : null;
  } catch {
    return null;
  }
}

export function saveStudyState(s: StudyState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function defaultStudyState(): StudyState {
  return {
    okSet: [],
    hardSet: [],
    seenSet: [],
    currentIdx: 0,
    isHardMode: false,
    deck: words.map((w) => w.id),
  };
}

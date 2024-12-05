type certificateType = {
  name: string; // 자격증 명
  passingDate: string; // 합격 일자
  expirationStart: string; // 유효기간(시작)
  expirationEnd: string; // 유효기간(끝)
  Issuer: string; // 발급 기관
};
const certificates: certificateType[] = [
  {
    name: `SQLD(SQL Developer)`,
    passingDate: '2024-09-20',
    expirationStart: '2024-09-20',
    expirationEnd: '2026-09-20',
    Issuer: '한국데이터산업진흥원(KData)',
  },
];

export type { certificateType };
export { certificates };

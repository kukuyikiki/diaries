let mobile = '18379836654';
let mobileReg = /(?=(\d{4})+$)/g;

console.log(mobile.replace(mobileReg, '-')); // 183-7983-6654

// 小于11位的
const formatMobile = (mobile) => {
  return String(mobile)
    .slice(0, 11)
    .replace(/(?<=\d{3})\d+/, ($0) => {
      console.log($0);
      return '-' + $0;
    })
    .replace(/(?<=[\d-]{8})\d{1,4}/, ($0) => {
      console.log($0);
      return '-' + $0;
    });
};

formatMobile('15939999607');

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 요소 선택
    const scrollFadeInUp = document.querySelectorAll('.scroll-fade-in-up');
    const scrollFadeInRight = document.querySelectorAll('.scroll-fade-in-right');
    const scrollFadeInDown = document.querySelectorAll('.scroll-fade-in-down');

    // 모든 스크롤 애니메이션 요소 합치기
    const scrollAnimElements = [...scrollFadeInUp, ...scrollFadeInRight, ...scrollFadeInDown];

    // 스크롤 이벤트 핸들러
    function checkScroll() {
        scrollAnimElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // 요소가 이 픽셀만큼 보이면 애니메이션 시작

            if (elementTop < window.innerHeight - elementVisible) {
                // 지연시간 적용
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('active');
                }, delay * 1000);
            }
        });
    }

    // 초기 체크
    checkScroll();

    // 스크롤 시 체크
    window.addEventListener('scroll', checkScroll);
});
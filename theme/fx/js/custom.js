/*

http://ety.kr

*/

/*

$(function() {

	// navbar
	const $dropdown = $(".dropdown");
	const $dropdownToggle = $(".dropdown-toggle");
	const $dropdownMenu = $(".dropdown-menu");
	const showClass = "show";

	$(window).on("load resize", function() {
	  if (this.matchMedia("(min-width: 768px)").matches) {
		$dropdown.hover(
		  function() {
			const $this = $(this);
			$this.addClass(showClass);
			$this.find($dropdownToggle).attr("aria-expanded", "true");
			$this.find($dropdownMenu).addClass(showClass);
		  },
		  function() {
			const $this = $(this);
			$this.removeClass(showClass);
			$this.find($dropdownToggle).attr("aria-expanded", "false");
			$this.find($dropdownMenu).removeClass(showClass);
		  }
		);
	  } else {
		$dropdown.off("mouseenter mouseleave");
	  }
	});

});
*/


$(function(){
		$('.submenu_li').mouseenter(function(event){
			$(this).find("ul").stop().slideDown(50);
		}).mouseleave(function(){
			$(this).find("ul:visible").stop().slideUp(50);
		});
		var flag = false;
		$('.hd_drop_name').mouseenter(function(){
			if(flag) return;
			$('.hd_drop_down').slideDown(500, function(){flag = true;});
		});
		$('.hd_drop_name').mouseleave(function(){
			if(!flag) return;
			$('.hd_drop_down').slideUp(500, function(){flag = false;});
		});

		$("#top_btn").on("click", function() {
            $("html, body").animate({scrollTop:0}, '500');
            return false;
        });

		$("#main-visual").nxslide({
				dots: false,
				fade: true,
				pauseOnFocus: false,
				pauseOnHover: false,
				arrows: false,
			});

			var win = $(window),
			header = $(".fixed-top"),
			headerOffsetTop = header.offset().top;

		win.scroll (function(){
		  if ( $(this).scrollTop() >= 100 ) {
			header.removeClass("in_mohd");
		  } else {
			header.addClass("in_mohd");
		  }    
	  });
	});	

	$(document).ready(function () {
			//owl
			jQuery(".owl-carousel").owlCarousel({
				autoplay:true,
				autoplayTimeout:3000,// 1000 -> 1초
				autoplayHoverPause:true,
				loop:true,
				margin:10,//이미지 사이의 간격
				nav:true,
				responsive:{
					0:{
						items:2 // 모바일
					},
					600:{
						items:3 // 브라우저 600px 이하
					},
					1000:{
						items:5 // 브라우저 100px 이하
					}
				}
			});

			// countdown
			'use strict';			
			jQuery('.countdown').final_countdown({
				'start': 1362139200,
				'end': 1388461320,
				'now': 1387461319        
			});
		});

		function ajax_update_toastr()
			{
				$.ajax({
					url: "https://iwith-water.com/plugin/toastr/toastr.php",
					type: "POST",
					success: function(response, status) {
							$('#check').html(response);
					},
					eror:function(request, status, error){
						
					},
					complete:function ()
					{
						
					}
				});
			}

			$( document ).ready(function() {
				ajax_update_toastr();
				setInterval("ajax_update_toastr()", 20000);
			});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.org_item');
    const prevBtn = document.querySelector('.carousel_prev');
    const nextBtn = document.querySelector('.carousel_next');
    
    if (!carousel) return;
    
    // 영상들을 복제해서 무한 슬라이드 만들기
    const originalItems = Array.from(carousel.children);
    
    // 화면 크기에 따라 한 번에 보여줄 영상 개수 결정
    function getItemsPerView() {
        if (window.innerWidth <= 768) {
            return 1; // 모바일에서는 1개
        } else {
            return 3; // 데스크톱에서는 3개
        }
    }
    
    let itemsPerView = getItemsPerView();
    
    // 원본 영상들을 3번 복제해서 끝없이 이어지게 만들기
    for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
    }
    
    const totalItems = carousel.children.length;
    let currentPage = 0;
    let autoSlideInterval;
    
    // 화면 크기 변경 시 itemsPerView 업데이트
    window.addEventListener('resize', () => {
        itemsPerView = getItemsPerView();
        updateCarousel();
    });
    
    // 초기 설정
    updateCarousel();
    startAutoSlide();
    
    // 자동 슬라이드 시작
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000); // 3초마다
    }
    
    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // 다음 슬라이드 (한방향으로만)
    function nextSlide() {
        currentPage++;
        
        // 마지막에 도달하면 처음으로 돌아가기 (사용자에게는 보이지 않음)
        if (currentPage >= totalItems - itemsPerView + 1) {
            // 부드러운 전환을 위해 잠시 대기 후 처음으로 이동
            setTimeout(() => {
                currentPage = 0;
                updateCarousel();
            }, 500);
        }
        
        updateCarousel();
    }
    
    // 이전 슬라이드 (한방향으로만)
    function prevSlide() {
        currentPage--;
        
        // 처음에 도달하면 마지막으로 돌아가기 (사용자에게는 보이지 않음)
        if (currentPage < 0) {
            // 부드러운 전환을 위해 잠시 대기 후 마지막으로 이동
            setTimeout(() => {
                currentPage = totalItems - itemsPerView;
                updateCarousel();
            }, 500);
        }
        
        updateCarousel();
    }
    
    // 캐러셀 업데이트
    function updateCarousel() {
        const translateX = -(currentPage * (100 / itemsPerView));
        carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    // 버튼 이벤트
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    // 마우스 호버 시 자동 슬라이드 정지
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // 터치/스크롤 이벤트 (모바일)
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // 최소 스와이프 거리
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoSlide();
    });
});
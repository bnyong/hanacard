window.onload = function () {
	gsap.registerPlugin(ScrollTrigger);

	// common : 스크롤 시 요소 노출
	const boxs = gsap.utils.toArray('.box');
	boxs.forEach((box) => {
		function checkBox() {
			if (box.classList.contains('move-left')) {
				return {
					from: { x: 60, opacity: 0 },
					to: {
						x: 0,
						opacity: 1,
						duration: 0.7,
						scrollTrigger: {
							trigger: box,
							start: '0% 65%',
							// markers: true,
						},
					},
				};
			} else if (box.classList.contains('move-right')) {
				return {
					from: { x: -60, opacity: 0 },
					to: {
						x: 0,
						opacity: 1,
						duration: 0.7,
						scrollTrigger: {
							trigger: box,
							start: '0% 75%',
							// markers: true,
						},
					},
				};
			} else if (box.classList.contains('move-up')) {
				return {
					from: { y: 60, opacity: 0 },
					to: {
						y: 0,
						opacity: 1,
						duration: 0.7,
						scrollTrigger: {
							trigger: box,
							start: '0% 70%',
							// markers: true,
						},
					},
				};
			} else {
				return {
					from: { opacity: 0 },
					to: {
						opacity: 1,
						duration: 0.7,
						scrollTrigger: {
							trigger: box,
							start: '0% 30%',
							end: '100% 100%',
							// markers: true,
						},
					},
				};
			}
		}

		const settings = checkBox();

		if (settings) {
			gsap.fromTo(box, settings.from, settings.to);
		}
	});

	// about : chat 설정
	// 이모지 사이트 : https://snskeyboard.com/emoji/#sp_3
	const CHATTEXT = [
		'안녕하세요! 👋',
		'웹퍼블리셔 구본용 입니다.',
		'무더웠던 여름이 가고, 어느새 눈이 내리고 있네요.',
		'혹시 겨울 좋아하시나요? ⛄',
		'따뜻한 자리에 앉아 코딩하는 것을 좋아하는 저는 겨울이 와서 참 반갑습니다.',
		'저는 시멘틱 마크업을 지향하고, 웹표준과 웹접근성을 준수하여 웹사이트를 방문하는 사람들이 동일한 경험을 할 수 있도록 노력하고 있습니다. 👍',
		'Javascript 스킬을 꾸준히 늘리고 있으며, 요즘에는 React를 활용해서 화면을 구성해보려 하고 있습니다.',
		// 'component화한 조각들을 모아 완성하는 것에서 기존 HTML과는 다른 매력을 발견했습니다! 🔥',
		'뵙게 되어 정말 반갑습니다. 잘 부탁드립니다! 🎈',
	];
	const chatLoading = document.querySelector('.chat-loading');

	setTimeout(() => {
		chating();
	}, 3000);

	function chating() {
		let chatTextind = 0;
		// 채팅창에 쓸 내용 반복 실행
		const chatInterval = setInterval(() => {
			// 채팅창에 쓸 내용 없을 때 빠져나옴
			if (chatTextind >= CHATTEXT.length) {
				clearInterval(chatInterval);
				return;
			}
			setTimeout(() => {
				chatLoading.classList.remove('open');
				const currentChat = CHATTEXT[chatTextind - 1];
				// 태그 만들어서 html에 추가, 클래스 추가
				const divEl = document.createElement('div');
				const spanEl = document.createElement('span');
				divEl.className = 'chat-content';
				divEl.appendChild(spanEl);
				spanEl.textContent = currentChat;
				document.querySelector('.chat-contents').appendChild(divEl);
			}, 0);
			setTimeout(() => {
				if (chatTextind < CHATTEXT.length) {
					chatLoading.classList.add('open');
				}
			}, 400);

			chatTextind += 1;
		}, 1000);
	}

	// portfolio : 포트폴리오 노출
	const PORTFOLIOS = gsap.utils.toArray('#portfolio .portfolio-list > li');
	PORTFOLIOS.forEach((portfolioList) => {
		gsap.fromTo(
			portfolioList,
			{ y: 100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.7,
				scrollTrigger: {
					trigger: portfolioList,
					start: '-100px 70%',
					// markers: true,
				},
			}
		);
	});

	// skill : 박스 크기 조절
	let skillBoxs = $('.skill-box li');
	let skillBoxsF = $('.skill-box[data-index="0"] li');
	let skillBoxsS = $('.skill-box[data-index="1"] li');

	function skillInitialize() {
		if ($(window).width() < 769) {
			$(skillBoxs).off('mouseenter');
			skillBoxs.addClass('open');
		} else {
			$(skillBoxs).removeClass('open');
			$(skillBoxsF).eq(0).addClass('open');
			$(skillBoxsS).eq(4).addClass('open');
			$(skillBoxs).on('mouseenter', (e) => {
				const isIndexZero = $(e.currentTarget).parent().data('index') === 0;
				const skillBoxIndex = isIndexZero ? skillBoxsF : skillBoxsS;
				skillCheck(skillBoxIndex, e.currentTarget);
			});
		}
	}
	function skillCheck(skillBoxIndex, element) {
		skillBoxIndex.removeClass('open');
		$(element).addClass('open');
	}

	skillInitialize();

	$(window).on('resize', function () {
		skillInitialize();
	});

	// 첫 dimm 화면
	const greeting = document.querySelector('.greeting-text');
	const enterEl = document.querySelector('.enter');
	const dimms = document.querySelectorAll('.dimmed div');

	setTimeout(() => {
		greeting.classList.add('close');
		dimms.forEach((dim) => {
			dim.classList.add('rise');
		});
	}, 1700);
	setTimeout(() => {
		enterEl.classList.add('close');
	}, 3400);

	// Top 버튼
	$('#top-btn').click(function () {
		$('html,body').animate({ scrollTop: '0' }, 800);
	});
	let topCheck = false;
	$(window).scroll(function () {
		let scroll = window.scrollY;
		scroll > $('#about').outerHeight() / 2 ? toggleTop(true) : toggleTop(false);
		function toggleTop(boolean) {
			if (topCheck !== boolean) {
				$('.top-btn-box').toggleClass('view');
				topCheck = boolean;
			}
		}
	});

	// Gnb : 햄버거 버튼
	$('.btn-gnb-open').on('click', function () {
		$('.gnb-wrap').show();
		$('.gnb-wrap').delay(100).animate({ right: '0px' }, 80);
		$('html, body').css({ overflow: 'hidden' });
		$('header').addClass('noFilter');
	});
	$('.btn-gnb-close').on('click', function () {
		$('.gnb-wrap').show();
		$('.gnb-wrap').delay(100).animate({ right: '-100%' }, 80);
		$('html, body').css({ overflow: '' });
		setTimeout(() => {
			$('header').removeClass('noFilter');
		}, 500);
	});

	// Gnb : 각 section으로 이동
	$('.gnb a').on('click', function (e) {
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
		if ($(window).width() < 769) {
			$('.gnb-wrap').show();
			$('.gnb-wrap').delay(100).animate({ right: '-100%' }, 80);
			$('html, body').css({ overflow: '' });
			setTimeout(() => {
				$('header').removeClass('noFilter');
			}, 1000);
		}
		e.preventDefault();
	});

	// Gnb : 스타일 변경
	let checkFilter = false;
	let checkGnb = false;
	$(window).scroll(function () {
		let scroll = window.scrollY;
		const headerH = $('header').outerHeight();
		const about = $('#about');
		const skill = $('#skill');
		const portfolio = $('#portfolio');
		const contact = $('#contact');

		// header에 backdrop-filter 클래스 토글
		if ($(window).width() > 768) {
			scroll >= headerH ? toggleFilter(true) : toggleFilter(false);
		}
		function toggleFilter(boolean) {
			if (checkFilter !== boolean) {
				$('header').toggleClass('filter');
				checkFilter = boolean;
			}
		}

		// on 클래스 토글
		scroll >= contact.offset().top - 150
			? toggleOn(false, 'contact')
			: scroll >= portfolio.offset().top - 150
			? toggleOn(true, 'portfolio')
			: scroll >= skill.offset().top - 150
			? toggleOn(false, 'skill')
			: scroll >= about.offset().top - 150
			? toggleOn(true, 'about')
			: toggleOn(false);

		function toggleOn(boolean, location = false) {
			if (checkGnb !== boolean) {
				$('.gnb li').removeClass('on');
				let gnbLink = $(`.gnb li a[href="#${location}"]`);
				if (location) {
					gnbLink.parent().addClass('on');
				}

				checkGnb = boolean;
			}
		}
	});
	$(window).resize(function () {
		if ($(window).width() > 768) {
			$('header').removeClass('filter');
			checkFilter = false;

			// gnb : gnb-wrap에 인라인 스타일 초기화
			const gnbWrap = document.querySelector('.gnb-wrap');
			gnbWrap.style.right ? (gnbWrap.style = '') : false;
		}
	});

	// progress : 상단 진행바 설정
	gsap.to('progress', {
		value: 100,
		ease: 'none',
		scrollTrigger: {
			scrub: 0.3,
		},
	});
};

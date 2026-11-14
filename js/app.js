/* Liana Tatli — каталог, корзина, коробочка с отзывами */
(() => {
  'use strict';

  const WHATSAPP = '79787646296';
  const $ = (s, r = document) => r.querySelector(s);
  const waLink = text => `https://wa.me/${WHATSAPP}${text ? '?text=' + encodeURIComponent(text) : ''}`;
  const fmt = n => n.toLocaleString('ru-RU') + ' ₽';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Иллюстрации для позиций без фото ---------- */
  let uid = 0;
  const BERRY = 'M50 116C33 112 10 86 11 57C12 39 28 31 50 33C72 31 88 39 89 57C90 86 67 112 50 116Z';

  function berrySVG({ choc = '#4a2c20', top = 'drizzle', accent = '#fff' } = {}) {
    const id = 'b' + (++uid);
    let topping = '';
    if (top === 'drizzle') topping = `<path d="M10 80 28 70 24 88 46 74 41 94 64 77 58 98 80 81 74 101 92 88" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (top === 'sprinkle') topping = [[26, 78], [40, 86], [58, 80], [70, 92], [34, 98], [52, 102], [66, 74], [46, 72], [78, 78]]
      .map(([x, y], i) => `<rect x="${x}" y="${y}" width="5" height="4" rx="1.4" fill="${i % 3 ? '#c8243f' : '#e8586e'}" transform="rotate(${i * 37} ${x} ${y})"/>`).join('');
    if (top === 'gold') topping = `<path d="M38 80l10-6 9 5-3 9-11 2-6-4z" fill="#d9b25d"/><path d="M44 79l6-2 3 4-5 3z" fill="#f2d68c"/>`;
    if (top === 'flower') topping = `<g transform="translate(50 86)" fill="${accent}">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="6" ry="9" transform="rotate(${a}) translate(0 -8)"/>`).join('')}<circle r="5" fill="${choc}" stroke="${accent}" stroke-width="1.5"/></g>`;
    return `<svg viewBox="0 0 100 120" aria-hidden="true"><defs>
      <clipPath id="${id}c"><path d="${BERRY}"/></clipPath>
      <linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0505f"/><stop offset="1" stop-color="#b8182f"/></linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      <path d="${BERRY}" fill="url(#${id}r)"/>
      <g fill="#f7d36b">${[[30, 46], [42, 42], [56, 42], [68, 47], [24, 56], [38, 54], [52, 53], [64, 56], [76, 57]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.5" ry="2.4"/>`).join('')}</g>
      <g clip-path="url(#${id}c)">
        <path d="M0 63Q8 57 16 63T32 63T48 63T64 63T80 63T96 63T112 63V130H0Z" fill="${choc}"/>
        <path d="M0 63Q8 57 16 63T32 63T48 63T64 63T80 63T96 63T112 63V130H0Z" fill="url(#${id}h)"/>
        ${topping}
      </g>
      <path d="M50 37 36 23l12 5 2-15 4 15 11-7-6 13 15-1-15 7z" fill="#4d8b3a"/>
      <path d="M49 26c-1-6 0-11 3-15" stroke="#3c6f2c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  const ART = {
    strawberry: () => berrySVG({ choc: '#8a5a3c', top: 'drizzle', accent: '#f6d7da' }),
    berries: () => `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="34" cy="58" r="16" fill="#3d4f86"/><circle cx="31" cy="53" r="3" fill="#93a3d6" opacity=".7"/><circle cx="62" cy="40" r="15" fill="#c22d4b"/>${[[56, 34], [64, 32], [68, 40], [58, 44], [62, 48], [54, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#e04765"/>`).join('')}<circle cx="66" cy="70" r="14" fill="#33467a"/><circle cx="63" cy="66" r="2.6" fill="#93a3d6" opacity=".7"/></svg>`,
    heart: () => `<svg viewBox="0 0 100 92" aria-hidden="true"><path d="M50 88C20 66 4 50 4 30 4 15 16 4 30 4c9 0 16 5 20 12C54 9 61 4 70 4c14 0 26 11 26 26 0 20-16 36-46 58Z" fill="#c9374a"/><path d="M50 78C26 61 14 48 14 32c0-10 8-18 17-18 8 0 14 5 19 13 5-8 11-13 19-13 9 0 17 8 17 18 0 16-12 29-36 46Z" fill="#fbe9e6"/>${[[32, 30, '#8a5a3c'], [50, 36, '#f2e6d8'], [68, 30, '#4a2c20'], [38, 48, '#e9a3ae'], [58, 50, '#8a5a3c'], [48, 63, '#4a2c20']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="8" fill="${c}"/>`).join('')}</svg>`,
    bouquet: () => `<svg viewBox="0 0 100 110" aria-hidden="true"><path d="M22 46 50 106 78 46Z" fill="#efc3c5"/><path d="M50 106 22 46h10l18 56Z" fill="#e3a9ae"/>${[[34, 36, '#4a2c20'], [50, 28, '#f2e6d8'], [66, 36, '#8a5a3c'], [42, 48, '#e9a3ae'], [58, 48, '#4a2c20']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="12" fill="${c}"/><path d="M${x} ${y - 11}l-5-6 5 2 0-6 3 6 4-3-2 6z" fill="#4d8b3a"/>`).join('')}<path d="M40 74h20l-4 8h-12z" fill="#fff"/></svg>`,
    mochi: () => `<svg viewBox="0 0 100 80" aria-hidden="true"><ellipse cx="50" cy="66" rx="40" ry="8" fill="#000" opacity=".08"/><path d="M10 60c0-26 18-46 40-46s40 20 40 46c0 6-18 8-40 8S10 66 10 60Z" fill="#f2a9b8"/><path d="M28 30c6-8 14-11 22-11s16 4 21 10c-2 6-10 7-12 3-3 5-9 6-12 1-4 4-12 4-19-3Z" fill="#fff8f2"/>${[[44, 20], [52, 18], [58, 22]].map(([x, y]) => `<rect x="${x}" y="${y}" width="4" height="4" rx="1" fill="#c8243f"/>`).join('')}</svg>`,
    dome: () => `<svg viewBox="0 0 100 80" aria-hidden="true"><ellipse cx="50" cy="68" rx="38" ry="7" fill="#e9d6c4"/><path d="M14 64C14 38 30 18 50 18s36 20 36 46Z" fill="#6b4434"/><path d="M26 44c4-12 13-19 22-20" stroke="#fff" stroke-opacity=".35" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="16" r="6" fill="#c6a061"/></svg>`,
    bar: () => `<svg viewBox="0 0 100 90" aria-hidden="true"><rect x="12" y="12" width="76" height="66" rx="8" fill="#f6e7da"/>${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => `<circle cx="${24 + c * 17.3}" cy="${24 + r * 14.3}" r="6.4" fill="${['#4a2c20', '#8a5a3c', '#f2e6d8', '#e9a3ae'][(r + c) % 4]}"/>`).join('')).join('')}</svg>`,
    nut: () => `<svg viewBox="0 0 100 80" aria-hidden="true">${[[34, 44], [62, 40], [48, 58]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="14" fill="#5a3626"/><path d="M${x - 9} ${y - 3}q9 -8 18 0" stroke="#c6a061" stroke-width="2" fill="none"/>`).join('')}<circle cx="58" cy="26" r="6" fill="#8e1b2c"/></svg>`,
    cup: () => `<svg viewBox="0 0 100 110" aria-hidden="true"><path d="M26 46h48l-10 58H36Z" fill="#e6c08c"/><path d="M30 58h40M32 72h36M34 86h32" stroke="#c99c62" stroke-width="2"/><path d="M22 46c0-12 12-18 28-18s28 6 28 18Z" fill="#6b4434"/><ellipse cx="42" cy="30" rx="8" ry="10" fill="#d72d45"/><path d="M42 20l-4-5 4 2 1-5 2 5 3-2-2 5z" fill="#4d8b3a"/><circle cx="60" cy="32" r="6" fill="#3d4f86"/></svg>`,
    donut: () => `<svg viewBox="0 0 100 80" aria-hidden="true"><ellipse cx="50" cy="44" rx="40" ry="28" fill="#e2b07c"/><ellipse cx="50" cy="40" rx="36" ry="23" fill="#5a3626"/><ellipse cx="50" cy="40" rx="10" ry="6" fill="#fbf6f1"/><path d="M24 34q8 4 12 0M64 30q6 4 12 0M40 54q6 3 12 0" stroke="#7ac17a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    tree: () => `<svg viewBox="0 0 100 110" aria-hidden="true"><path d="M50 8 82 92H18Z" fill="#6b4434"/><path d="M50 8 66 50Q50 44 34 50Z" fill="#7da86a"/><path d="M30 62q20 -8 40 0M24 78q26 -10 52 0" stroke="#c6a061" stroke-width="3" fill="none"/><rect x="44" y="92" width="12" height="12" fill="#4a2c20"/><path d="M50 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" fill="#d9b25d"/></svg>`,
    gift: () => `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="16" y="38" width="68" height="50" rx="4" fill="#efc3c5"/><rect x="12" y="28" width="76" height="14" rx="3" fill="#e3a9ae"/><rect x="45" y="28" width="10" height="60" fill="#fff"/><path d="M50 28c-8-14-24-14-20-4 2 5 12 5 20 4Zm0 0c8-14 24-14 20-4-2 5-12 5-20 4Z" fill="#fff" stroke="#e3a9ae" stroke-width="2"/></svg>`
  };
  const ART_BG = {
    strawberry: '#f8e4e3', berries: '#efe7f3', heart: '#f8e0e1', bouquet: '#f6e9e2', mochi: '#fbeaea',
    dome: '#efe3d8', bar: '#f3e7dc', nut: '#eee1d5', cup: '#f7ecdf', donut: '#f6e6da', tree: '#e9efe4', gift: '#f8e4e3'
  };

  /* ---------- Каталог ---------- */
  const CATS = [
    { id: 'all', name: 'Все' },
    { id: 'strawberry', name: 'Клубника в шоколаде 🍓' },
    { id: 'hearts', name: 'Клубничные сердца ♥️' },
    { id: 'berry', name: 'Ягодные наборы' },
    { id: 'bouquets', name: 'Букеты' },
    { id: 'mochi', name: 'Моти' },
    { id: 'korpus', name: 'Корпусные десерты' },
    { id: 'choco', name: 'Шоколадные наборы' },
    { id: 'nuts', name: 'Орешки 🌰' },
    { id: 'cups', name: 'Стаканчики и пончики' },
    { id: 'ny', name: 'Новый год 🎄' }
  ];

  const PRODUCTS = [
    { id: 'klubnika', cat: 'strawberry', title: 'Клубника в шоколаде', tag: 'Хит',
      img: 'img/strawberry-close.jpg', desc: 'Шоколад на выбор: белый, молочный, тёмный, клубничный, апельсиновый. Фирменная упаковка, открытка и любой дизайн из прайса — уже в цене.',
      opts: [[6, 1400], [9, 1800], [10, 2000], [12, 2400], [15, 2650], [16, 2800], [20, 3400], [25, 3900], [30, 5500], [35, 6200], [40, 6800]].map(([n, p]) => ({ label: n + ' шт', price: p })), def: 1 },
    { id: 'dop-yagody', cat: 'strawberry', title: 'Голубика или малина к набору', art: 'berries', desc: '15 ягод — добавлю в любой набор клубники.', price: 500, unit: '15 шт' },

    { id: 'serdce-nadpis', cat: 'hearts', title: 'Клубничное сердце с надписью', tag: 'Надпись — любая', img: 'img/heart-box.jpg', desc: 'Клубника в разном шоколаде, голубика, сублимированная малина и шоколадная табличка с вашим текстом. 29×26 см.', price: 4900 },
    { id: 'serdce', cat: 'hearts', title: 'Клубничное сердце', art: 'heart', desc: 'Коробка-сердце 36×28 см.', price: 5500 },
    { id: 'serdce-45', cat: 'hearts', title: 'Большое сердце, 45 ягод', art: 'heart', desc: 'Коробка 35×28 см, 45 клубник в шоколаде.', price: 7500 },
    { id: 'serdce-yagodnoe', cat: 'hearts', title: 'Ягодное сердце', art: 'heart', desc: 'Клубника, малина и голубика. 29×23 см.', price: 5400 },
    { id: 'serdce-shik', cat: 'hearts', title: '«Шикарное» сердце', tag: 'Премиум', art: 'heart', desc: 'Инжир, клубника, черешня, ежевика, малина, банан, голубика. 35×30 см.', price: 10000 },
    { id: 'serdce-kniga', cat: 'hearts', title: 'Сердце-книжка', art: 'heart', desc: 'Раскрывающаяся коробка в форме сердца.', price: 4500 },
    { id: 'love', cat: 'hearts', title: 'Коробка «LOVE»', art: 'heart', desc: 'Клубника в шоколаде в буквах LOVE. 55×23 см. Состав и шоколад можно менять.', price: 9500 },

    { id: 'yagodny', cat: 'berry', title: 'Ягодный набор', art: 'berries', desc: 'Ежевика, клубника, голубика, малина. 30×25 см.', price: 5000 },
    { id: 'assorti', cat: 'berry', title: 'Бокс ассорти', art: 'berries', desc: 'Черешня, голубика и клубника в белом и малиновом шоколаде.', price: 2200 },
    { id: 'premium', cat: 'berry', title: 'Премиум-набор', art: 'gift', desc: 'Большой подарочный набор 28×22 см.', price: 4900 },
    { id: 'tort-klubnichny', cat: 'berry', title: 'Клубничный торт', art: 'strawberry', desc: '27 клубник в шоколаде. Свечка и топпер «С Днём Рождения» — в подарок.', price: 4300 },

    { id: 'buket-rozy', cat: 'bouquets', title: 'Букет с розами из шоколада', art: 'bouquet', desc: 'Клубника в белом и молочном шоколаде, розы из клубничного шоколада.', price: 5000 },
    { id: 'sumochka', cat: 'bouquets', title: 'Сумочка с шоколадными цветами', art: 'bouquet', desc: 'Милый подарок для мамы, учителя или подруги.', price: 2500 },
    { id: 'buket-stakan', cat: 'bouquets', title: 'Букет-стаканчик', art: 'bouquet', desc: 'Компактный ягодный букет в стаканчике.', price: 1700 },

    { id: 'moti', cat: 'mochi', title: 'Моти', tag: 'Новинка', img: 'img/mochi.jpg', desc: 'Вкусы: манго-маракуйя, клубника-банан, фисташка-малина, «Дубай».',
      opts: [{ label: '4 шт', price: 1000 }, { label: '6 шт', price: 1500 }, { label: '9 шт', price: 2250 }], def: 1 },

    { id: 'golubika', cat: 'korpus', title: 'Десерт «Голубика»', img: 'img/korpus-golubika.jpg', desc: 'Взбитый йогуртовый ганаш, черничная начинка со свежей голубикой, корпус из белого шоколада.', price: null },
    { id: 'fistashka', cat: 'korpus', title: 'Десерт «Фисташка»', art: 'dome', desc: 'Можно заказать от 1 штуки.', price: 450, unit: '1 шт' },
    { id: 'kofe', cat: 'korpus', title: 'Десерт «Кофе» в подарочной коробке', art: 'dome', desc: 'В коробочке с лентой — маленький подарок без повода.', price: 400, unit: '1 шт' },
    { id: 'korpus-nabor', cat: 'korpus', title: 'Набор корпусных десертов', art: 'dome', desc: 'Малина, банан, кофе, фисташка, голубика, маракуйя, манго. Наборы по 6, 9 и 30 штук.', price: null },

    { id: 'konfety', cat: 'choco', title: 'Конфеты ручной работы, 16 шт', art: 'bar', desc: 'Молочный и белый шоколад с сублимированными ягодами и орехами. Хранятся 3 месяца.', price: 1750 },
    { id: 'vip', cat: 'choco', title: 'VIP-набор', art: 'gift', desc: 'Шоколадный набор в коробке 20×20 см.', price: 1650 },
    { id: 'uchitelyu', cat: 'choco', title: 'Набор «Учителю»', art: 'bar', desc: 'Шоколадный набор с надписью «Спасибо за Ваш труд».', price: 750 },

    { id: 'orehi', cat: 'nuts', title: 'Грецкий орех с вяленой вишней', art: 'nut', desc: '15 штук в бельгийском шоколаде без пальмового масла.', price: 1200, unit: '15 шт' },

    { id: 'stakanchik', cat: 'cups', title: 'Ягодный стаканчик', art: 'cup', desc: 'Вафельный стаканчик, ягоды и шоколад. От 1 штуки.',
      opts: [{ label: 'Дубай + клубника', price: 450 }, { label: 'Голубика', price: 550 }, { label: 'Банан', price: 350 }, { label: 'Гранат', price: 400 }], def: 0 },
    { id: 'ponchik', cat: 'cups', title: 'Пончик «Дубай» с клубникой', art: 'donut', desc: 'Шоколадный пончик с дубайской начинкой и свежей клубникой.', price: 450, unit: '1 шт' },

    { id: 'ny-nabor', cat: 'ny', title: 'Новогодний шоколадный набор', tag: '−10% до 1 декабря', img: 'img/ny-box.jpg', desc: 'Олень в венке, снежинки, шарики, мишка и надпись «С Новым годом!» — фигурный шоколад ручной работы.', price: null },
    { id: 'elka', cat: 'ny', title: '«Дубайская ёлка»', tag: 'Предзаказ', art: 'tree', desc: 'Шоколадная ёлка с дубайской начинкой.', price: 1400 },
    { id: 'corp', cat: 'ny', title: 'Корпоративные наборы', art: 'gift', desc: 'Подарки для коллег и партнёров с вашим логотипом или надписью.', price: null }
  ];
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const selected = {}; // выбранная опция для товара

  const media = (p, cls = '') => p.img
    ? `<img src="${p.img}" alt="${esc(p.title)}" loading="lazy" class="${cls}">`
    : `<div class="product__art" style="background:${ART_BG[p.art]}">${ART[p.art]()}</div>`;

  const priceOf = p => p.opts ? p.opts[selected[p.id] ?? p.def].price : p.price;

  let activeCat = 'all';
  function renderCats() {
    $('#cats').innerHTML = CATS.map(c => {
      const n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === c.id).length;
      return `<button class="cat" role="tab" data-cat="${c.id}" aria-selected="${c.id === activeCat}">${c.name}<sup>${n}</sup></button>`;
    }).join('');
  }
  function productCard(p) {
    const price = priceOf(p);
    const opts = p.opts ? `<div class="product__opts" role="group" aria-label="Вариант">${p.opts.map((o, i) =>
      `<button class="opt" data-opt="${i}" aria-pressed="${i === (selected[p.id] ?? p.def)}">${o.label}</button>`).join('')}</div>` : '';
    const priceHTML = price == null
      ? `<div class="product__price product__price--ask">Цена по запросу</div>`
      : `<div class="product__price">${fmt(price)}${p.unit ? `<small>${p.unit}</small>` : ''}</div>`;
    const btn = price == null
      ? `<a class="add-btn add-btn--ask" href="${waLink(`Здравствуйте, Лиана! Подскажите, пожалуйста, цену: «${p.title}».`)}" target="_blank" rel="noopener">Узнать цену</a>`
      : `<button class="add-btn" data-add>В корзину</button>`;
    return `<article class="product" data-id="${p.id}">
      <div class="product__media">${media(p)}${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ''}</div>
      <div class="product__body">
        <h3 class="product__title">${esc(p.title)}</h3>
        <p class="product__desc">${esc(p.desc)}</p>
        ${opts}
        <div class="product__foot">${priceHTML}${btn}</div>
      </div></article>`;
  }
  function renderProducts() {
    let list = activeCat === 'all' ? PRODUCTS.slice() : PRODUCTS.filter(p => p.cat === activeCat);
    if (activeCat === 'all') list.sort((a, b) => (b.img ? 1 : 0) - (a.img ? 1 : 0));
    $('#products').innerHTML = list.map(productCard).join('');
  }

  $('#cats').addEventListener('click', e => {
    const b = e.target.closest('.cat'); if (!b) return;
    activeCat = b.dataset.cat; renderCats(); renderProducts();
  });
  $('#products').addEventListener('click', e => {
    const card = e.target.closest('.product'); if (!card) return;
    const p = byId[card.dataset.id];
    const opt = e.target.closest('.opt');
    if (opt) {
      selected[p.id] = +opt.dataset.opt;
      card.querySelectorAll('.opt').forEach(b => b.setAttribute('aria-pressed', b === opt));
      card.querySelector('.product__price').innerHTML = fmt(priceOf(p)) + (p.unit ? `<small>${p.unit}</small>` : '');
      return;
    }
    if (e.target.closest('[data-add]')) {
      const btn = e.target.closest('[data-add]');
      addToCart(p.id, p.opts ? (selected[p.id] ?? p.def) : null);
      btn.textContent = 'Добавлено ✓'; btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'В корзину'; btn.classList.remove('added'); }, 1400);
    }
  });

  /* ---------- Корзина ---------- */
  const STORE = 'liana-cart-v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORE)) || []; } catch (_) { cart = []; }
  cart = cart.filter(i => byId[i.id]);
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(cart)); } catch (_) { /* приватный режим */ } };
  const itemPrice = i => { const p = byId[i.id]; return i.opt != null ? p.opts[i.opt].price : p.price; };
  const itemOpt = i => { const p = byId[i.id]; return i.opt != null ? p.opts[i.opt].label : (p.unit || ''); };

  function addToCart(id, opt) {
    const key = id + ':' + opt;
    const found = cart.find(i => i.key === key);
    if (found) found.qty++; else cart.push({ key, id, opt, qty: 1 });
    save(); renderCart();
    const c = $('#cartCount'); c.classList.add('bump'); setTimeout(() => c.classList.remove('bump'), 250);
    toast(`«${byId[id].title}» — в корзине`);
  }
  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + i.qty * itemPrice(i), 0);
    $('#cartCount').textContent = count;
    $('#cartTotal').textContent = fmt(total);
    $('#cartHint').textContent = count ? 'Доставка рассчитывается отдельно. Бонус на первый заказ — укажите в пожеланиях.' : '';
    $('#checkoutBtn').classList.toggle('is-disabled', !count);
    updateCheckoutLink();
    $('#orderForm').hidden = !count;
    if (!count) {
      $('#cartList').innerHTML = `<div class="cart-empty">${berrySVG({ choc: '#e9a3ae', top: 'drizzle' })}<p>Корзина пока пустая.<br>Загляните в каталог — там вкусно.</p></div>`;
      return;
    }
    $('#cartList').innerHTML = cart.map(i => {
      const p = byId[i.id];
      return `<div class="cart-item" data-key="${i.key}">
        <div class="cart-item__img">${p.img ? `<img src="${p.img}" alt="">` : ART[p.art]()}</div>
        <div><div class="cart-item__title">${esc(p.title)}</div><div class="cart-item__opt">${esc(itemOpt(i))}</div><div class="cart-item__price">${fmt(itemPrice(i) * i.qty)}</div></div>
        <div class="qty"><button data-dec aria-label="Меньше">−</button><span>${i.qty}</span><button data-inc aria-label="Больше">+</button></div>
      </div>`;
    }).join('');
  }
  $('#cartList').addEventListener('click', e => {
    const row = e.target.closest('.cart-item'); if (!row) return;
    const item = cart.find(i => i.key === row.dataset.key);
    if (e.target.closest('[data-inc]')) item.qty++;
    else if (e.target.closest('[data-dec]')) item.qty--;
    else return;
    cart = cart.filter(i => i.qty > 0); save(); renderCart();
  });

  const drawer = $('#drawer'), overlay = $('#overlay');
  const openCart = () => { drawer.classList.add('open'); overlay.classList.add('show'); drawer.setAttribute('aria-hidden', 'false'); };
  const closeCart = () => { drawer.classList.remove('open'); overlay.classList.remove('show'); drawer.setAttribute('aria-hidden', 'true'); };
  $('#cartOpen').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  const form = $('#orderForm');
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  form.date.min = today.toISOString().slice(0, 10);
  form.addEventListener('change', () => {
    form.querySelector('.order-form__address').style.display = form.delivery.value === 'Самовывоз' ? 'none' : '';
  });

  function buildOrder() {
    const f = Object.fromEntries(new FormData(form));
    const lines = cart.map((i, n) => `${n + 1}. ${byId[i.id].title}${itemOpt(i) ? ` (${itemOpt(i)})` : ''} × ${i.qty} — ${fmt(itemPrice(i) * i.qty)}`);
    const total = cart.reduce((s, i) => s + i.qty * itemPrice(i), 0);
    const date = f.date ? new Date(f.date + 'T00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) : '';
    const msg = [
      'Здравствуйте, Лиана! Хочу оформить заказ с сайта 🍓', '',
      ...lines, '', `Итого: ${fmt(total)}`, '',
      `Имя: ${f.name}`,
      `Дата: ${date}${f.time ? ', ' + f.time : ''}`,
      `Получение: ${f.delivery}${f.delivery === 'Доставка' && f.address ? ' — ' + f.address : ''}`,
      f.comment ? `Пожелания: ${f.comment}` : ''
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n').trim();
    return msg;
  }
  function updateCheckoutLink() { $('#checkoutBtn').href = waLink(cart.length ? buildOrder() : ''); }
  form.addEventListener('input', updateCheckoutLink);
  form.addEventListener('change', updateCheckoutLink);
  $('#checkoutBtn').addEventListener('click', e => {
    // настоящая ссылка: если форма не заполнена — не переходим, подсвечиваем поля
    if (!cart.length || !form.reportValidity()) { e.preventDefault(); return; }
    updateCheckoutLink();
  });

  let toastTimer;
  function toast(text) {
    const t = $('#toast'); t.textContent = text; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Мобильное меню ---------- */
  const burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  /* ---------- Отзывы: коробочка ---------- */
  const REVIEWS = [
    { tag: 'Ирена', author: '@irena23_01', what: 'комментарий в Instagram', text: 'На все праздники заказываю, все пробовали, все на высшем уровне 👏🔥🤤' },
    { tag: 'Ленура', author: 'Ленура', what: 'шоколадные фрукты и клубника', text: 'Лиана абла, чокъ сагъ олныз за эту красоту 😍🥰 всё как всегда на высшем уровне 💗❤️🥰' },
    { tag: 'Адлин', author: '@adlin', what: 'клубника в шоколаде', text: 'вкуснее клубники я не ела 😍' },
    { tag: 'Эдем', author: 'Edem Emirsaliev', what: 'отзыв в переписке', text: 'Очень вкусный шоколад, спасибо вам большое ❤️' },
    { tag: 'Алёна', author: '@alenaati', what: 'клубника в шоколаде и цветы', text: 'Доброе утро началось с доставки цветов и клубники в шоколаде' },
    { tag: 'Фатиме', author: '@tohtarova_fatime', what: 'шоколадный набор «Спасибо за Ваш труд»', text: 'Красиво, празднично и необычно 🥰🌸💞' },
    { tag: 'гостья', author: 'покупательница', what: 'отзыв в переписке', text: 'Добрый день)) Вчера было безумно вкусно, я остановиться не могла 😂' },
    { tag: 'Иса', author: '@isa_jaguar1989', what: 'корзина клубники на нишан', text: 'Это нишан у нас дома) @liana_tatli Анам тут рекламирует гостям)' },
    { tag: 'Мавилена', author: '@mavilena_17', what: 'комментарий в Instagram', text: 'Все заказываю, каждый день 😂❤️' },
    { tag: 'гостья', author: 'покупательница', what: 'корпусные десерты и стаканчики', text: 'Селям алейкум! Десерты понравились, но особенно стаканчики 😍 Это просто 🔥 Эмиштешка, которая не любит сладкое, теперь его обожает 😊' },
    { tag: 'Фатиме', author: '@tohtarova_fatime', what: 'клубника в шоколаде', text: 'Так вкусно и красиво 😍' },
    { tag: 'гостья', author: 'покупательница', what: 'отзыв в переписке', text: 'Нет вот просто шикарно получилось, я честно в восторге! Мне лично очень понравилось' }
  ];
  const STYLES = [
    { choc: '#4a2c20', top: 'drizzle', accent: '#fff' },
    { choc: '#f3eadf', top: 'sprinkle' },
    { choc: '#8a5a3c', top: 'gold' },
    { choc: '#eaa3ae', top: 'drizzle', accent: '#fff' },
    { choc: '#8a5a3c', top: 'flower', accent: '#6b4434' },
    { choc: '#f3eadf', top: 'drizzle', accent: '#d98a96' },
    { choc: '#4a2c20', top: 'sprinkle' },
    { choc: '#eaa3ae', top: 'gold' }
  ];
  const grid = $('#boxGrid'), box = $('#reviewBox'), note = $('#reviewNote');
  grid.innerHTML = REVIEWS.map((r, i) =>
    `<button class="cell" data-i="${i}" aria-label="Отзыв: ${esc(r.author)}" tabindex="-1">
      <span class="cell__berry">${berrySVG(STYLES[i % STYLES.length])}</span>
      <span class="cell__tag">${esc(r.tag)}</span></button>`).join('');

  let current = -1;
  function showReview(i) {
    current = (i + REVIEWS.length) % REVIEWS.length;
    const r = REVIEWS[current];
    grid.querySelectorAll('.cell').forEach((c, n) => c.classList.toggle('is-active', n === current));
    $('#noteWhat').textContent = r.what;
    $('#noteText').textContent = r.text;
    $('#noteAuthor').textContent = '— ' + r.author;
    $('#noteCounter').textContent = `${current + 1} / ${REVIEWS.length}`;
    note.classList.remove('swap'); void note.offsetWidth; note.classList.add('swap');
  }
  function openBox() {
    if (box.classList.contains('is-open')) return;
    box.classList.add('is-open');
    grid.querySelectorAll('.cell').forEach(c => c.removeAttribute('tabindex'));
    setTimeout(() => { if (current < 0) showReview(0); }, 450);
  }
  $('#boxLid').addEventListener('click', openBox);
  grid.addEventListener('click', e => { const c = e.target.closest('.cell'); if (c) showReview(+c.dataset.i); });
  $('#notePrev').addEventListener('click', () => { openBox(); showReview(current - 1); });
  $('#noteNext').addEventListener('click', () => { openBox(); showReview(current + 1); });

  /* ---------- Старт ---------- */
  renderCats(); renderProducts(); renderCart();
  if (location.hash === '#reviews-open') openBox();
})();

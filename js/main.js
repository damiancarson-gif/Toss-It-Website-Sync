
/* =========================================
   TOSS-IT WEBSITE
   MAIN JAVASCRIPT
========================================= */

/* =========================================
   1. BUSINESS CONFIGURATION
========================================= */

const CFG = {
    phone: "416-893-5253",
    email: "sales@toss-it.ca",
    reviewUrl: "#",

    liveHosts: [
        "dcremovalca.com",
        "www.dcremovalca.com"
    ],

    base: {
        name: "Whitby",
        lat: 43.8975,
        lon: -78.9429
    },

    metaPixelId: "",
    ga4Id: "",

    offer: {
        title: "$25 off your first pickup",
        text: "Mention the ad when you text or book. Good on any job of $250 or more.",
        code: "Promo Code: ROOM25"
    },

    hours: {
        0: null,
        1: [7, 20],
        2: [7, 20],
        3: [7, 20],
        4: [7, 20],
        5: [7, 20],
        6: [8, 18]
    },

    startAt: 119,

    amounts: [
        "A single item",
        "A few pieces",
        "About a room",
        "A garage or basement",
        "A whole house"
    ],

    factors: [
        [
            "How much",
            "Volume",
            "A couch is about a cubic yard. A single garage is about ten. The trailer takes about nine per trip."
        ],
        [
            "Where it sits",
            "Access",
            "Curb and driveway cost least. Garage, basement, upstairs and condo elevators add carry time, and we charge for the time."
        ],
        [
            "How far",
            "Mileage",
            "From our base in Whitby to you, then to the Durham dump and back. Closer is cheaper."
        ],
        [
            "What it is",
            "Weight",
            "Disposal is charged by the tonne. Furniture and bags are light; drywall, tile and concrete are not."
        ]
    ],

    examples: [
        [
            "Couch at the curb",
            "Stacked with another job the same day",
            "from $160"
        ],
        [
            "Half a garage",
            "5 yards from the garage, one trip",
            "from $480"
        ],
        [
            "Kitchen reno debris in the driveway",
            "6 yards of cabinets and drywall",
            "from $505"
        ],
        [
            "Basement cleanout",
            "8 yards up one flight",
            "from $660"
        ],
        [
            "Full single garage",
            "10 yards, two trailer trips",
            "from $730"
        ],
        [
            "Whole-house estate",
            "25 yards, three trips, one day",
            "from $1,570"
        ]
    ],

    couches: [
        {
            k: "Loveseat",
            p: 119,
            t: "Two-seater, armchair, recliner or chaise.",
            i: "love"
        },
        {
            k: "Sofa",
            p: 159,
            t: "Standard three-seater, sofa bed or futon.",
            i: "sofa"
        },
        {
            k: "Sectional",
            p: 219,
            t: "L-shape or three-plus pieces. We take it apart.",
            i: "sect"
        }
    ],

    couchNote: "Add a second piece for $49. Curb or garage pickup with nothing to carry: take $20 off.",

    specials: [
        ["Hot tub", "from $499", "Drained first. Cut up and removed, pad swept."],
        ["Pool table", "from $349", "Slate taken apart. Three-piece slate +$100."],
        ["Upright piano", "from $299", "Stairs or tight turns +$100."],
        ["Grand / baby grand", "from $499", "Legs and lyre removed on site."],
        ["Fridge or freezer", "from $139", "Includes refrigerant handling."],
        ["Other appliances", "from $109", "Stove, washer, dryer, dishwasher."],
        ["Mattress or box spring", "from $89", "Any size. Both pieces together from $129."],
        ["Treadmill or gym gear", "from $139", "Ellipticals, bikes, weight racks."],
        ["Safe (under 300 lb)", "from $199", "Heavier safes quoted from a photo."],
        ["Shed teardown", "from $449", "Taken down, hauled, area raked."],
        ["TV or electronics", "from $49", "Any size, recycled properly."],
        ["Concrete, tile, drywall", "Photo quote", "Heavy materials priced by weight."]
    ],

    extras: [
        ["Same-day pickup", "+$49 when available"],
        ["Walk-ups past the 2nd floor", "+$25 per floor"],
        ["Outside Durham and the East GTA", "travel quoted up front"],
        ["All prices", "plus HST, pay by e-transfer or card"]
    ]
};


/* =========================================
   2. GENERAL WEBSITE HELPERS
========================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => [
    ...document.querySelectorAll(selector)
];

document.addEventListener("error", event => {
    const target = event.target;

    if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        target.classList.add("x");
    }

    if (target.tagName === "SOURCE") {
        target.parentNode.classList.add("x");
    }
}, true);


/* =========================================
   3. CONTACT INFORMATION
========================================= */

const digits = CFG.phone.replace(/\D/g, "");

$$("[data-tel]").forEach(link => {
    link.href = "tel:+1" + digits;
});

$$("[data-sms]").forEach(link => {
    link.href = "sms:+1" + digits;
});

$$("[data-phone]").forEach(link => {
    link.textContent = CFG.phone;
});

$$("[data-mail]").forEach(link => {
    link.href = "mailto:" + CFG.email;
    link.textContent = CFG.email;
});

$$("[data-review]").forEach(link => {
    link.href = CFG.reviewUrl;

    if (CFG.reviewUrl !== "#") {
        link.target = "_blank";
    } else {
        link.style.display = "none";
    }
});

$("#yr").textContent = new Date().getFullYear();


/* =========================================
   4. CAMPAIGN TRACKING
========================================= */

(function () {
    const query = new URLSearchParams(location.search);

    const keep = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "fbclid",
        "gclid"
    ];

    let value = keep
        .filter(key => query.get(key))
        .map(key => key + "=" + query.get(key).slice(0, 80))
        .join("&");

    try {
        if (value) {
            sessionStorage.setItem("dc_utm", value);
        } else {
            value = sessionStorage.getItem("dc_utm") || "";
        }
    } catch (_) {}

    $("#qutm").value = value || (
        document.referrer
            ? "ref=" + new URL(document.referrer).hostname
            : "direct"
    );
})();


/* =========================================
   5. BOOKING DATE RESTRICTIONS
========================================= */

(function () {
    const now = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "America/Toronto"
        })
    );

    const date =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    $("#f-date").min = date;
})();


/* =========================================
   6. MOBILE NAVIGATION
========================================= */

const burger = $(".burger");
const nav = $("#nav");

burger.onclick = () => {
    const isOpen = nav.classList.toggle("open");

    burger.setAttribute("aria-expanded", isOpen);
};


/* =========================================
   7. GOOGLE ANALYTICS AND META PIXEL
========================================= */

function track(eventName, data) {
    try {
        if (window.fbq) {
            fbq("track", eventName, data || {});
        }

        if (window.gtag) {
            gtag("event", eventName.toLowerCase(), data || {});
        }
    } catch (_) {}
}

if (CFG.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;

        n = f.fbq = function () {
            n.callMethod
                ? n.callMethod.apply(n, arguments)
                : n.queue.push(arguments);
        };

        if (!f._fbq) f._fbq = n;

        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];

        t = b.createElement(e);
        t.async = true;
        t.src = v;

        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);

    }(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", CFG.metaPixelId);
    fbq("track", "PageView");
}

if (CFG.ga4Id) {
    const script = document.createElement("script");

    script.async = true;
    script.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        CFG.ga4Id;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
        dataLayer.push(arguments);
    };

    gtag("js", new Date());
    gtag("config", CFG.ga4Id);
}

document.addEventListener("click", event => {
    const link = event.target.closest(
        "a[href^='tel:'],a[href^='sms:']"
    );

    if (link) {
        track("Contact", {
            content_name: link.href.startsWith("sms")
                ? "text"
                : "call"
        });
    }
});


/* =========================================
   8. BOOKING FORM LOAD OPTIONS
========================================= */

const qload = $("#qload");

CFG.amounts.forEach(amount => {
    const option = document.createElement("option");

    option.textContent = amount;
    qload.appendChild(option);
});


/* =========================================
   9. BEFORE AND AFTER IMAGE SLIDER
========================================= */

(function () {
    const beforeAfter = $("#ba");
    const slider = $("#baRange");

    if (!beforeAfter) return;

    const setPosition = value => {
        beforeAfter.style.setProperty("--x", value + "%");
    };

    slider.addEventListener("input", () => {
        setPosition(slider.value);
    });

    setPosition(slider.value);

    const reduceMotion = matchMedia(
        "(prefers-reduced-motion:reduce)"
    ).matches;

    if (reduceMotion) return;

    let played = false;

    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || played) return;

            played = true;
            observer.disconnect();

            let startTime = null;

            const from = 55;
            const to = 22;
            const back = 58;
            const duration = 2600;

            const animate = timestamp => {
                if (!startTime) startTime = timestamp;

                const progress = Math.min(
                    (timestamp - startTime) / duration,
                    1
                );

                const value = progress < 0.5
                    ? from + (to - from) *
                        (0.5 - 0.5 * Math.cos(progress * 2 * Math.PI))
                    : to + (back - to) *
                        (0.5 - 0.5 * Math.cos((progress - 0.5) * 2 * Math.PI));

                slider.value = value;
                setPosition(value);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 500);
        });
    }, {
        threshold: 0.5
    }).observe(beforeAfter);
})();


/* =========================================
   10. PHONE TEXT MESSAGE DEMO
========================================= */

(function () {
    const chat = $("#chat");

    if (!chat) return;

    const messages = [
        {
            w: "me",
            img: "img/before.jpg",
            t: "Hi, could you clear all this out? Garage in Ajax.",
            time: "2:14 PM"
        },
        {
            w: "dc",
            t: "Hi! That's about 5 yards from the garage in Ajax, so $480 all in: loading, hauling and disposal. We could come tomorrow between 9 and 11.",
            time: "2:16 PM"
        },
        {
            w: "me",
            t: "Perfect, book it.",
            time: "2:17 PM"
        },
        {
            w: "dc",
            t: "Done. See you at 9. We'll text when we're on the way.",
            time: "2:17 PM"
        }
    ];

    const reduceMotion = matchMedia(
        "(prefers-reduced-motion:reduce)"
    ).matches;

    const createBubble = message => {
        const div = document.createElement("div");

        div.className = "bub " + message.w;

        div.innerHTML =
            (message.img
                ? `<img src="${message.img}" alt="">`
                : "") +
            message.t +
            `<span class="t">${message.time}</span>`;

        return div;
    };

    const createTyping = () => {
        const div = document.createElement("div");

        div.className = "bub dc typing";
        div.innerHTML = "<i></i><i></i><i></i>";

        return div;
    };

    const sleep = milliseconds => new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

    async function play() {
        chat.innerHTML = "";

        if (reduceMotion) {
            messages.forEach(message => {
                const bubble = createBubble(message);

                bubble.classList.add("on");
                chat.appendChild(bubble);
            });

            return;
        }

        let first = true;

        for (const message of messages) {
            await sleep(
                first ? 0 : (message.w === "dc" ? 900 : 1200)
            );

            first = false;

            if (message.w === "dc") {
                const typing = createTyping();

                chat.appendChild(typing);

                requestAnimationFrame(() => {
                    typing.classList.add("on");
                });

                await sleep(1500);
                typing.remove();
            }

            const bubble = createBubble(message);

            chat.appendChild(bubble);

            requestAnimationFrame(() => {
                bubble.classList.add("on");
            });
        }

        await sleep(7000);
        play();
    }

    let started = false;

    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                observer.disconnect();
                play();
            }
        });
    }, {
        threshold: 0.4
    }).observe(chat);
})();


/* =========================================
   11. PRICING INFORMATION
========================================= */

$("#factors").innerHTML = CFG.factors.map(factor => `
    <div class="factor">
        <span class="k">${factor[1]}</span>
        <b>${factor[0]}</b>
        <span>${factor[2]}</span>
    </div>
`).join("");

$("#tiers").innerHTML = CFG.examples.map(example => `
    <div>
        <div>
            <b>${example[0]}</b>
            <em>${example[1]}</em>
        </div>
        <span class="p">
            ${example[2].replace(/^about /, "<small>about</small>")}
        </span>
    </div>
`).join("");

const teaserNumbers = [
    [
        "$" + CFG.startAt,
        "Jobs start at"
    ],
    [
        CFG.examples[1][2].replace("about ", ""),
        CFG.examples[1][0].split(",")[0]
    ],
    [
        CFG.examples[4][2].replace("about ", ""),
        CFG.examples[4][0].split(",")[0]
    ]
];

$("#teaser-nums").innerHTML = teaserNumbers.map(item => `
    <div class="num">
        <b>${item[0]}</b>
        <span>${item[1]}</span>
    </div>
`).join("");


/* =========================================
   12. COUCH ICONS AND PRICING
========================================= */

const ICO = {
    love: `
        <svg viewBox="0 0 120 60" aria-hidden="true">
            <g fill="none" stroke="#1b1d21" stroke-width="2.2" stroke-linejoin="round">
                <rect x="30" y="22" width="60" height="22" rx="4"/>
                <path d="M30 30V18a5 5 0 0 1 10 0v4M90 30V18a5 5 0 0 0-10 0v4"/>
                <path d="M40 26h40v-8a4 4 0 0 0-4-4H44a4 4 0 0 0-4 4z" fill="#efe9dd"/>
                <path d="M34 44v6M86 44v6"/>
            </g>
        </svg>
    `,

    sofa: `
        <svg viewBox="0 0 120 60" aria-hidden="true">
            <g fill="none" stroke="#1b1d21" stroke-width="2.2" stroke-linejoin="round">
                <rect x="14" y="22" width="92" height="22" rx="4"/>
                <path d="M14 30V18a5 5 0 0 1 10 0v4M106 30V18a5 5 0 0 0-10 0v4"/>
                <path d="M24 26h72v-8a4 4 0 0 0-4-4H28a4 4 0 0 0-4 4z" fill="#efe9dd"/>
                <path d="M48 14v12M72 14v12" stroke="#c8c1b3"/>
                <path d="M18 44v6M102 44v6"/>
            </g>
        </svg>
    `,

    sect: `
        <svg viewBox="0 0 120 60" aria-hidden="true">
            <g fill="none" stroke="#1b1d21" stroke-width="2.2" stroke-linejoin="round">
                <path d="M10 26a4 4 0 0 1 4-4h62v26H14a4 4 0 0 1-4-4z"/>
                <path d="M76 22h30a4 4 0 0 1 4 4v24H76z"/>
                <path d="M10 30V18a5 5 0 0 1 10 0v4"/>
                <path d="M20 26h52v-8a4 4 0 0 0-4-4H24a4 4 0 0 0-4 4z" fill="#efe9dd"/>
                <path d="M80 26h26v-8a4 4 0 0 0-4-4H84a4 4 0 0 0-4 4z" fill="#efe9dd"/>
                <path d="M46 14v12" stroke="#c8c1b3"/>
                <path d="M14 48v6M106 50v6"/>
            </g>
        </svg>
    `
};

$("#couches").innerHTML = CFG.couches.map(couch => `
    <a class="cc" href="#book" data-job="Couch or sectional">
        ${ICO[couch.i]}
        <b>${couch.k}</b>

        <div class="p">
            <small>from</small>$${couch.p}
        </div>

        <span>${couch.t}</span>
    </a>
`).join("");

$("#couchnote").textContent = CFG.couchNote;

$("#specials").innerHTML = CFG.specials.map(item => `
    <div>
        <div>
            <b>${item[0]}</b>
            <em>${item[2]}</em>
        </div>

        <span class="p${/^[$f]/.test(item[1]) ? "" : " c"}">
            ${item[1].replace(/^from /, "<small>from</small>")}
        </span>
    </div>
`).join("");

$("#extras").innerHTML = CFG.extras.map(item => `
    <li>
        <b>${item[0]}</b>
        <span>${item[1]}</span>
    </li>
`).join("");


/* =========================================
   13. SERVICES SHOWROOM
========================================= */

const SV = [
    [
        "tile-homes",
        "Furniture & mattresses",
        "Sofas, sectionals, beds and dressers, carried out of any room.",
        "residential"
    ],
    [
        "appliance",
        "Appliances",
        "Fridges, freezers, stoves, washers and dryers, disconnected and hauled.",
        "residential"
    ],
    [
        "tile-garage",
        "Garages & basements",
        "Years of storage cleared in an afternoon. Keep what you want, we take the rest.",
        "garage"
    ],
    [
        "tile-estate",
        "Estate cleanouts",
        "Patient, respectful whole-home cleanouts for families and executors.",
        "estate"
    ],
    [
        "tile-reno",
        "Renovation debris",
        "Cabinets, drywall, flooring and countertops, with no bin left sitting in the driveway.",
        "reno"
    ],
    [
        "shed",
        "Sheds, hot tubs & yards",
        "Taken apart on site and removed, with the area raked clean.",
        "residential"
    ],
    [
        "tile-business",
        "Offices & retail",
        "Desks, fixtures and shelving, scheduled around your business hours.",
        "commercial"
    ],
    [
        "tile-condo",
        "Tenant turnovers",
        "Whatever the last tenant left, cleared so the unit re-rents faster.",
        "partners"
    ]
];

const frame = $("#frame");
const servicesList = $("#svcs");

frame.innerHTML = SV.map((service, index) => `
    <img
        src="img/${service[0]}.jpg"
        alt="${service[1]}"
        ${index ? 'loading="lazy"' : ""}
    >
`).join("") + `
    <div class="cap">
        <h3 id="capt"></h3>
        <p id="capp"></p>
        <a class="link" id="capl" href="#">See details</a>
    </div>
`;

servicesList.innerHTML = SV.map((service, index) => `
    <li>
        <button
            role="tab"
            id="sv${index}"
            aria-selected="false"
        >
            <span class="nm">${service[1]}</span>
            <small>View</small>
        </button>
    </li>
`).join("");

let selectedService = -1;

function pick(index) {
    if (index === selectedService) return;

    selectedService = index;

    $$("#frame img").forEach((image, imageIndex) => {
        image.classList.toggle("on", imageIndex === index);
    });

    $$("#svcs button").forEach((button, buttonIndex) => {
        button.setAttribute(
            "aria-selected",
            buttonIndex === index
        );
    });

    $("#capt").textContent = SV[index][1];
    $("#capp").textContent = SV[index][2];
    $("#capl").href = "#" + SV[index][3];
}

$$("#svcs button").forEach((button, index) => {
    button.addEventListener("mouseenter", () => pick(index));
    button.addEventListener("focus", () => pick(index));
    button.addEventListener("click", () => pick(index));
});

pick(0);


/* =========================================
   14. THE WORK - PHOTO GALLERY
========================================= */

const G = [
    ["trailer-loaded", "Loading up"],
    ["tile-reno", "Renovation debris, gone"],
    ["hot-tub", "Hot tub removal"],
    ["yard", "Yard waste"],
    ["mattress", "Mattress pickup"],
    ["storage", "Storage unit cleanout"],
    ["restaurant", "Restaurant cleanup"],
    ["reno-site", "Job-site debris"]
];

$("#mosaic").innerHTML = G.map((photo, index) => `
    <button
        class="m${index + 1}"
        data-i="${index}"
        aria-label="Open photo: ${photo[1]}"
    >
        <img
            src="img/${photo[0]}.jpg"
            alt="${photo[1]}"
            loading="lazy"
        >
        <span>${photo[1]}</span>
    </button>
`).join("");


/* =========================================
   15. PHOTO LIGHTBOX
========================================= */

let lbI = 0;
let lbRet = null;

const lb = $("#lb");

function showLb() {
    $("#lbi").src = "img/" + G[lbI][0] + ".jpg";
    $("#lbi").alt = G[lbI][1];
    $("#lbc").textContent = G[lbI][1];
}

function openLb(index, returnElement) {
    lbI = index;
    lbRet = returnElement;

    showLb();

    lb.classList.add("open");
    document.body.style.overflow = "hidden";

    lb.querySelector(".c").focus();
}

function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";

    if (lbRet) {
        lbRet.focus();
    }
}

function step(direction) {
    lbI = (lbI + direction + G.length) % G.length;
    showLb();
}

$$("#mosaic button").forEach(button => {
    button.onclick = () => {
        openLb(+button.dataset.i, button);
    };
});

lb.querySelector(".c").onclick = closeLb;

lb.querySelector(".p").onclick = () => step(-1);

lb.querySelector(".n").onclick = () => step(1);

lb.onclick = event => {
    if (event.target === lb) closeLb();
};

document.addEventListener("keydown", event => {
    if (!lb.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeLb();
    }

    if (event.key === "ArrowLeft") {
        step(-1);
    }

    if (event.key === "ArrowRight") {
        step(1);
    }

    if (event.key === "Tab") {
        const buttons = [...lb.querySelectorAll("button")];
        const activeIndex = buttons.indexOf(document.activeElement);

        event.preventDefault();

        buttons[
            (activeIndex + (event.shiftKey ? -1 : 1) + buttons.length) %
            buttons.length
        ].focus();
    }
});

let touchX = 0;

lb.addEventListener("touchstart", event => {
    touchX = event.touches[0].clientX;
}, {
    passive: true
});

lb.addEventListener("touchend", event => {
    const difference =
        event.changedTouches[0].clientX - touchX;

    if (Math.abs(difference) > 50) {
        step(difference < 0 ? 1 : -1);
    }
});


/* =========================================
   16. SERVICE AREA MAP
========================================= */

const T = [
    ["Whitby", 43.8975, -78.9429, "d"],
    ["Brooklin", 43.9586, -78.9556, "d"],
    ["Ajax", 43.8509, -79.0204, "d"],
    ["Pickering", 43.8384, -79.0868, "d", "l"],
    ["Claremont", 43.9706, -79.1271, "d"],
    ["Oshawa", 43.8971, -78.8658, "d"],
    ["Courtice", 43.9069, -78.7836, "d", "t"],
    ["Bowmanville", 43.9128, -78.6876, "d", "b"],
    ["Newcastle", 43.9187, -78.5888, "d", "t"],
    ["Orono", 43.9876, -78.6203, "d"],
    ["Port Perry", 44.1031, -78.9447, "d"],
    ["Uxbridge", 44.1086, -79.1205, "d"],
    ["Beaverton", 44.4269, -79.1528, "d"],
    ["Cannington", 44.3486, -79.0346, "d"],
    ["Scarborough", 43.7731, -79.2578, "e"],
    ["Markham", 43.8561, -79.337, "e"],
    ["Stouffville", 43.9706, -79.2441, "o"],
    ["East York", 43.6911, -79.3277, "o"],
    ["North York", 43.7615, -79.4111, "o"],
    ["Downtown Toronto", 43.6532, -79.3832, "o"],
    ["Richmond Hill", 43.8828, -79.4403, "o"],
    ["Vaughan", 43.8361, -79.4983, "o"],
    ["Etobicoke", 43.6435, -79.565, "o"],
    ["Mississauga", 43.589, -79.6441, "o"],
    ["Brampton", 43.7315, -79.7624, "o"],
    ["Newmarket", 44.0592, -79.4613, "o"],
    ["Aurora", 44.0065, -79.4504, "o"],
    ["Oakville", 43.4675, -79.6877, "o"],
    ["Port Hope", 43.9516, -78.293, "o"],
    ["Peterborough", 44.3091, -78.3197, "o"]
];

const FSA = {
    d: "L1B L1C L1E L1G L1H L1J L1K L1L L1M L1N L1P L1R L1S L1T L1V L1W L1X L1Y L1Z L9L L9P L0B L0E",
    e: "M1B M1C M1E M1G M1H M1J M1K M1L M1M M1N M1P M1R M1S M1T M1V M1W M1X L3P L3R L3S L6B L6C L6E L6G"
};

const X0 = -79.45;
const X1 = -78.5;
const Y0 = 44.2;
const Y1 = 43.64;

const W = 640;
const H = 520;

const px = (latitude, longitude) => [
    (longitude - X0) / (X1 - X0) * W,
    (Y0 - latitude) / (Y0 - Y1) * H
];

const km = (a, b, c, d) => {
    const radians = Math.PI / 180;

    const deltaLat = (c - a) * radians;
    const deltaLon = (d - b) * radians;

    const h =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(a * radians) *
        Math.cos(c * radians) *
        Math.sin(deltaLon / 2) ** 2;

    return 12742 * Math.asin(Math.sqrt(h));
};

const mins = distance => {
    return Math.round(distance * 1.2 / 70 * 60 + 5);
};

const inMap = town => {
    return (
        town[2] > X0 &&
        town[2] < X1 &&
        town[1] < Y0 &&
        town[1] > Y1
    );
};


/* =========================================
   17. DRAW SERVICE AREA MAP
========================================= */

(function () {
    const path = points => {
        return "M" + points.map(point => {
            return px(point[0], point[1])
                .map(value => value.toFixed(1))
                .join(",");
        }).join("L");
    };

    const shore = [
        [43.632, -79.45],
        [43.635, -79.4],
        [43.645, -79.36],
        [43.655, -79.32],
        [43.67, -79.28],
        [43.7, -79.23],
        [43.735, -79.18],
        [43.765, -79.14],
        [43.8, -79.1],
        [43.815, -79.06],
        [43.835, -79.02],
        [43.85, -78.96],
        [43.858, -78.92],
        [43.862, -78.86],
        [43.865, -78.8],
        [43.875, -78.72],
        [43.885, -78.66],
        [43.895, -78.58],
        [43.905, -78.5]
    ];

    const lake = path(shore) + `L${W},${H}L0,${H}Z`;

    const zone = path([
        [43.69, -79.25],
        [43.75, -79.31],
        [43.86, -79.37],
        [43.93, -79.28],
        [43.99, -79.17],
        [44.25, -79.17],
        [44.25, -78.45],
        [43.6, -78.45],
        [43.6, -79.25]
    ]) + "Z";

    const base = px(CFG.base.lat, CFG.base.lon);

    const font = 'font-family="Instrument Sans, sans-serif"';

    let svg = `
        <rect width="${W}" height="${H}" fill="#ffffff"/>

        <path
            d="${zone}"
            fill="#277d44"
            fill-opacity=".07"
            stroke="#277d44"
            stroke-opacity=".45"
            stroke-width="1.4"
            stroke-dasharray="5 5"
        />

        <path d="${lake}" fill="#dfe4ea"/>

        <text
            x="${W * 0.55}"
            y="${H * 0.9}"
            ${font}
            font-size="14"
            fill="#8a929b"
        >Lake Ontario</text>
    `;

    svg += `
        <g ${font} font-size="11.5">
            <rect
                x="${W - 188}"
                y="16"
                width="172"
                height="52"
                rx="10"
                fill="#fff"
                stroke="#e3ddd1"
            />

            <rect
                x="${W - 176}"
                y="28"
                width="12"
                height="12"
                rx="3"
                fill="#277d44"
                fill-opacity=".14"
                stroke="#277d44"
                stroke-opacity=".5"
                stroke-dasharray="3 2"
            />

            <text x="${W - 156}" y="38" fill="#1b1d21">
                Our service area
            </text>

            <circle
                cx="${W - 170}"
                cy="54"
                r="3.5"
                fill="none"
                stroke="#8e97a5"
                stroke-width="1.4"
            />

            <text x="${W - 156}" y="58" fill="#6c6d70">
                Ask us
            </text>
        </g>
    `;

    T.forEach(town => {
        if (town[0] === CFG.base.name || !inMap(town)) {
            return;
        }

        const position = px(town[1], town[2]);
        const inside = town[3] !== "o";
        const side = town[4];

        const dot = inside
            ? `<circle cx="${position[0]}" cy="${position[1]}" r="3" fill="#277d44"/>`
            : `<circle cx="${position[0]}" cy="${position[1]}" r="3" fill="#fff" stroke="#8e97a5" stroke-width="1.4"/>`;

        const labelX = side === "l"
            ? position[0] - 7
            : (side === "t" || side === "b")
                ? position[0]
                : position[0] + 7;

        const labelY = side === "t"
            ? position[1] - 9
            : side === "b"
                ? position[1] + 17
                : position[1] + 4;

        const anchor = side === "l"
            ? "end"
            : (side === "t" || side === "b")
                ? "middle"
                : "start";

        svg += dot + `
            <text
                x="${labelX}"
                y="${labelY}"
                text-anchor="${anchor}"
                ${font}
                font-size="11.5"
                fill="${inside ? "#0c0d0f" : "#8e97a5"}"
            >${town[0]}</text>
        `;
    });

    svg += `
        <circle
            cx="${base[0]}"
            cy="${base[1]}"
            r="9"
            fill="#277d44"
            stroke="#fff"
            stroke-width="2.5"
        />

        <text
            x="${base[0]}"
            y="${base[1] - 17}"
            text-anchor="middle"
            ${font}
            font-weight="700"
            font-size="12.5"
            fill="#277d44"
        >${CFG.base.name} (our base)</text>

        <circle
            id="hit"
            r="10"
            fill="none"
            stroke="#1b1d21"
            stroke-width="2"
            opacity="0"
        />
    `;

    $("#map").innerHTML = svg;

    $("#towns").innerHTML = T.map(town => `
        <option value="${town[0]}">
    `).join("");
})();


/* =========================================
   18. SEARCH SERVICE AREA
========================================= */

const ZMSG = {
    d: '<span class="ok">Inside our service area (Durham Region).</span>',
    e: '<span class="ok">Inside our service area.</span>',
    o: '<span class="far">Outside our usual area. Bigger jobs can still be worth the drive, so text us a photo.</span>'
};

$("#town").addEventListener("input", event => {
    const raw = event.target.value.trim();
    const value = raw.toLowerCase();

    const highlight = $("#hit");
    const result = $("#tres");

    const postalCode = raw.toUpperCase().replace(/\s/g, "");

    if (/^[A-Z]\d[A-Z]/.test(postalCode)) {
        highlight.setAttribute("opacity", 0);

        const prefix = postalCode.slice(0, 3);

        const zone = FSA.d.includes(prefix)
            ? "d"
            : FSA.e.includes(prefix)
                ? "e"
                : "o";

        result.innerHTML = `
            <b>Postal code ${prefix}</b>
            ${ZMSG[zone]}
        `;

        return;
    }

    const town = T.find(t => t[0].toLowerCase() === value);

    if (!town) {
        highlight.setAttribute("opacity", 0);
        return;
    }

    if (inMap(town)) {
        const position = px(town[1], town[2]);

        highlight.setAttribute("cx", position[0]);
        highlight.setAttribute("cy", position[1]);
        highlight.setAttribute("opacity", 1);
    } else {
        highlight.setAttribute("opacity", 0);
    }

    if (town[0] === CFG.base.name) {
        result.innerHTML = `
            <b>${town[0]}, our home base</b>
            ${ZMSG.d}
        `;

        return;
    }

    const distance = km(
        CFG.base.lat,
        CFG.base.lon,
        town[1],
        town[2]
    );

    const minutes = mins(distance);

    result.innerHTML = `
        <b>${town[0]}, about ${minutes} min</b>
        <span>
            ${Math.round(distance * 1.2)} km by road (est.)
            from our base in ${CFG.base.name}.
        </span>
        <br>
        ${ZMSG[town[3]]}
    `;
});


/* =========================================
   19. FREQUENTLY ASKED QUESTIONS
========================================= */

const F = [
    [
        "What areas do you cover?",
        "All of Durham Region, from Pickering and Ajax to Whitby, Oshawa and Clarington, up to Uxbridge and Port Perry, plus Scarborough and Markham. Further out? Text us a photo; bigger jobs are often worth the drive."
    ],
    [
        "How is the price set?",
        "For your job, not off a chart. Four things set it: how much there is, where it sits (curb, garage, basement, upstairs), how far we drive, and what it's made of, since heavy debris costs more to dump. Send a photo and we'll quote it. The exact price is confirmed on site before we start, and there's no charge if you decline."
    ],
    [
        "Do I need to be home?",
        "Not if the items are outside, in a garage or at the curb. Send photos, approve the price and pay by e-transfer or card afterwards."
    ],
    [
        "How soon can you come?",
        "Same or next day is often possible, especially if you book in the morning. Larger cleanouts are usually scheduled within a few days."
    ],
    [
        "What can't you take?",
        "Paint, solvents and chemicals, propane and fuel, asbestos and other hazardous materials, medical waste, car batteries and motor oil. We'll point you to the right drop-off."
    ],
    [
        "Where does it all go?",
        "To licensed disposal and recycling facilities. Items in good shape go to local donation centres when they'll accept them."
    ],
    [
        "Do you work with property managers and contractors?",
        "Yes, with priority scheduling and simple invoicing for repeat partners. See the Partners page."
    ]
];

$("#faqs").innerHTML = F.map(faq => `
    <details>
        <summary>${faq[0]}</summary>
        <p>${faq[1]}</p>
    </details>
`).join("");


/* =========================================
   20. BUSINESS HOURS STATUS
========================================= */

(function () {
    const hours = CFG.hours;

    const now = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "America/Toronto"
        })
    );

    const todayHours = hours[now.getDay()];

    const currentTime =
        now.getHours() + now.getMinutes() / 60;

    const isOpen =
        todayHours &&
        currentTime >= todayHours[0] &&
        currentTime < todayHours[1];

    const status = $("#ostat");

    status.textContent = isOpen ? "Open now" : "Closed now";
    status.className = "status " + (isOpen ? "y" : "n");
})();


/* =========================================
   21. BOOKING FORM SUBMISSION
========================================= */

$("#qform").addEventListener("submit", async event => {
    event.preventDefault();

    const form = event.target;
    const message = $("#qmsg");
    const source = $("#qsrc").value;

    const live =
        CFG.liveHosts.includes(location.hostname) ||
        location.hostname.endsWith(".netlify.app");

    if (!live) {
        message.className = "msg warn show";

        message.textContent =
            "This is a preview, so the form isn't connected yet. " +
            "For a quote now, call or text " + CFG.phone + ".";

        return;
    }

    try {
        const response = await fetch("/", {
            method: "POST",
            body: new FormData(form)
        });

        if (!response.ok) throw new Error("Submission failed");

        form.reset();

        message.className = "msg ok show";

        message.textContent =
            "Got it. We'll text you back within the hour " +
            "during business hours, usually much sooner.";

        track("Lead", {
            content_name: source
        });

    } catch (_) {
        message.className = "msg warn show";

        message.textContent =
            "The form didn't send. Call or text " +
            CFG.phone + " or email " + CFG.email + ".";
    }
});


/* =========================================
   22. INDIVIDUAL SERVICE PAGES
========================================= */

const S = {

    residential: {
        t: "Junk removal for homes",
        k: "Homes",
        h: "tile-homes",
        l: "From one armchair to a whole house. Carried out of any room, hauled off and swept clean.",
        job: "Furniture or mattresses",

        s: [
            [
                "couch",
                "Furniture",
                "Sofas, sectionals, dressers, tables and recliners, from any room.",
                ["Taken apart when needed", "Stairs and tight hallways", "Floors and walls protected"],
                "Furniture or mattresses"
            ],
            [
                "mattress",
                "Mattresses",
                "Mattresses, box springs and bed frames of any size.",
                ["Same day when available", "Frames taken apart", "Proper disposal facilities"],
                "Furniture or mattresses"
            ],
            [
                "appliance",
                "Appliances",
                "Fridges, freezers, stoves, washers, dryers and dishwashers.",
                ["Disconnected units only", "Refrigerant handled at proper facilities", "Basements and laundry rooms"],
                "Appliances"
            ],
            [
                "garage",
                "Garages",
                "Bikes, boxes, tools and the piles nobody wants to sort.",
                ["Keep what you want", "We load everything else", "Floor swept after"],
                "Garage or basement cleanout"
            ],
            [
                "basement-estate",
                "Basements & estates",
                "Patient whole-home cleanouts for downsizing families and estates.",
                ["At your family's pace", "Keepsakes set aside", "Usable items to donation where possible"],
                "Estate cleanout"
            ],
            [
                "hot-tub",
                "Hot tubs & sheds",
                "Cut down or taken apart on site and removed completely.",
                ["Drained and disconnected first", "Every piece removed", "Area raked clean"],
                "Shed, hot tub or yard"
            ]
        ],

        w: [
            ["Owners on every job", "You know exactly who is coming to your home."],
            ["Price before we lift", "Approve it on site. No charge if you say no."],
            ["Treated like our own", "Careful carrying, protected floors, a swept finish."]
        ]
    },

    commercial: {
        t: "Junk removal for business",
        k: "Businesses",
        h: "tile-business",
        l: "Offices, stores, restaurants and job sites, scheduled around your hours so the business keeps running.",
        job: "Office or retail",

        s: [
            [
                "office",
                "Offices",
                "Desks, chairs, filing cabinets, panels and old equipment.",
                ["Before or after hours", "Elevator and dock bookings", "One clear invoice"],
                "Office or retail"
            ],
            [
                "restaurant",
                "Restaurants",
                "Prep tables, shelving, seating and retired equipment.",
                ["Disconnected equipment only", "Off-hours scheduling", "Heavy items handled"],
                "Office or retail"
            ],
            [
                "storage",
                "Storage units",
                "Clear a locker before the next billing cycle.",
                ["Any unit size", "Keep what you want", "Left empty and swept"],
                "Office or retail"
            ],
            [
                "reno-debris",
                "Renovation debris",
                "Cabinets, countertops, drywall, flooring and trim.",
                ["Loaded from site or driveway", "Mixed debris welcome", "No bin permit needed"],
                "Renovation debris"
            ],
            [
                "reno-site",
                "Construction cleanup",
                "Interior debris hauled between trades.",
                ["Quick pickups between stages", "Bagged or loose", "Ready for the next trade"],
                "Renovation debris"
            ]
        ],

        w: [
            ["Your hours, not ours", "Early mornings, evenings and Saturdays."],
            ["Owners on the phone", "Text us directly. No dispatcher, no runaround."],
            ["Clean invoicing", "One price, ready for your books."]
        ]
    },

    partners: {
        t: "For property managers & contractors",
        k: "Partners",
        h: "tile-condo",
        l: "A crew you can call again and again for turnovers, pre-listing cleanouts and job-site debris, invoiced simply.",
        job: "Tenant turnover",

        s: [
            [
                "condo-moveout",
                "Tenant turnovers",
                "Whatever the last tenant left, cleared so you can re-rent faster.",
                ["Priority booking for partners", "Lockbox and key handoff", "Photos sent when done"],
                "Tenant turnover"
            ],
            [
                "prelisting",
                "Pre-listing cleanouts",
                "The house cleared before photos and showings.",
                ["Fast before listing day", "Garage, basement and yard", "Works with your stager"],
                "Pre-listing cleanout"
            ],
            [
                "bulk-room",
                "Building bulk rooms",
                "Scheduled pickups for condo bulk rooms and abandoned items.",
                ["Recurring schedule available", "Underground and loading docks", "One invoice per building"],
                "Office or retail"
            ],
            [
                "reno-site",
                "Contractor pickups",
                "On-call debris pickups so nothing piles up on site.",
                ["Short-notice pickups", "No bin in the driveway", "Inside or outside loading"],
                "Renovation debris"
            ],
            [
                "van-loaded",
                "Curbside pickups",
                "Piles at the curb or in a driveway, often the same day.",
                ["Nobody needs to be home", "Pay by e-transfer", "Evictions and turnovers"],
                "Tenant turnover"
            ]
        ],

        w: [
            ["Priority scheduling", "Partners go to the front of the line."],
            ["Referral thank-you", "A referral fee on every completed job you send us."],
            ["Photo proof", "Before and after photos, so you never drive over to check."]
        ]
    },

    estate: {
        t: "Clearing out a parent's home?",
        k: "Estate cleanouts",
        h: "tile-estate",
        l: "A patient, respectful whole-home cleanout, at your family's pace. Keepsakes set aside, usable things donated, the rest gone and the house left swept and ready.",
        job: "Estate cleanout",
        situation: true,

        s: [
            [
                "storage",
                "Keepsakes first",
                "We walk the house with you and set aside anything that stays. Nothing goes on the trailer until you say so.",
                ["Photos and documents boxed separately", "Work room by room, or all at once", "Executors and out-of-town family welcome"],
                "Estate cleanout"
            ],
            [
                "van-loaded",
                "Donation before disposal",
                "Furniture and household goods in good shape go to local donation centres whenever they'll take them.",
                ["Donation receipts where available", "Licensed disposal for the rest", "Appliances and electronics recycled"],
                "Estate cleanout"
            ],
            [
                "garage-clean",
                "Ready for the realtor",
                "Garage, basement and yard included. We sweep every room so the house is ready for photos or showings.",
                ["Multi-trip jobs priced up front", "Lockbox and key handoff fine", "Before and after photos sent"],
                "Estate cleanout"
            ]
        ],

        w: [
            ["No pressure, no clock", "We quote the whole job, not by the hour."],
            ["Owners on site", "Damian and Carson handle it personally."],
            ["One price, confirmed first", "Approve it before anything moves."]
        ]
    },

    downsizing: {
        t: "Moving to a smaller place?",
        k: "Downsizing",
        h: "condo-moveout",
        l: "Take what fits in the new place. We clear everything that doesn't, timed around your moving day, so you walk out of the old home with nothing left to deal with.",
        job: "Garage or basement cleanout",
        situation: true,

        s: [
            [
                "couch",
                "Furniture that won't fit",
                "Sofas, dining sets, bed frames and the spare-room furniture that has no place in a condo or a retirement residence.",
                ["Carried from any floor", "Donation when it's in good shape", "Taken apart if it won't fit the elevator"],
                "Furniture or mattresses"
            ],
            [
                "basement-estate",
                "Decades of basement",
                "Boxes, old files, holiday decorations, the things that were always going to get sorted later.",
                ["Keep pile and go pile", "Sorted with you, not for you", "Done in one visit for most homes"],
                "Garage or basement cleanout"
            ],
            [
                "garage-clean",
                "Timed to the move",
                "We come the day before or the day after the movers, so nothing is in their way and nothing is left behind.",
                ["Same or next day when possible", "Condo elevator bookings handled", "Swept and photographed when done"],
                "Garage or basement cleanout"
            ]
        ],

        w: [
            ["Owners on every job", "Careful with belongings, patient with decisions."],
            ["Price before we lift", "No hourly meter running while you decide."],
            ["Family-friendly", "We work with adult children, POAs and residences."]
        ]
    },

    garage: {
        t: "Get your garage back.",
        k: "Garage cleanouts",
        h: "tile-garage",
        l: "Years of storage cleared in an afternoon. You point at what stays, we load everything else and you park inside tonight.",
        job: "Garage or basement cleanout",
        situation: true,

        s: [
            [
                "garage",
                "You point, we load",
                "Keep what you want. Bikes, tools, boxes, broken furniture, old paint cans sorted to the right place.",
                ["Most single garages run $450 to $750", "Priced for the job, confirmed before we lift", "Hazardous items pointed to the right drop-off"],
                "Garage or basement cleanout"
            ],
            [
                "van-loaded",
                "Heavy stuff too",
                "Old appliances, workbenches, tires, lumber offcuts and leftover renovation material.",
                ["Appliances and electronics recycled", "Metal and wood separated", "Concrete and tile by weight"],
                "Garage or basement cleanout"
            ],
            [
                "garage-clean",
                "Swept floor, open door",
                "We sweep the floor before we leave. The garage is a garage again.",
                ["Done in one visit", "Before and after photos", "Same or next day when the schedule allows"],
                "Garage or basement cleanout"
            ]
        ],

        w: [
            ["Most garages $450 to $750", "Quoted from a photo before we come."],
            ["Owners on site", "No crew of the day."],
            ["No surprise fees", "Confirmed before we start loading."]
        ]
    },

    reno: {
        t: "Renovation leftovers, gone.",
        k: "Renovation debris",
        h: "tile-reno",
        l: "Old cabinets, drywall, flooring, countertops and trim, loaded from inside or the driveway. No bin blocking the street and no permit to chase.",
        job: "Renovation debris",
        situation: true,

        s: [
            [
                "reno-debris",
                "Kitchens and bathrooms",
                "Cabinets, vanities, tile, tubs and the pile of packaging that comes with the new stuff.",
                ["Loaded from any floor", "Mixed debris welcome", "Same-day pickups when a trade is waiting"],
                "Renovation debris"
            ],
            [
                "reno-site",
                "Between trades",
                "One quick pickup clears the site for the next crew, so nothing piles up and nobody trips over it.",
                ["Bagged or loose", "Short-notice pickups", "Contractor accounts welcome"],
                "Renovation debris"
            ],
            [
                "van-loaded",
                "No bin, no permit",
                "A bin on the street usually needs a city permit and a few days. We load, drive and you keep your driveway.",
                ["Heavy materials priced by weight", "Clean loads of wood or metal cost less", "Photo quote from the pile"],
                "Renovation debris"
            ]
        ],

        w: [
            ["Text a photo of the pile", "You'll have a number within the hour."],
            ["Owners doing the lifting", "Careful around new finishes."],
            ["One invoice", "One price, ready for your books."]
        ]
    }
};


/* =========================================
   23. PRE-SELECT BOOKING DETAILS
========================================= */

let pendingJob = null;
let pendingSrc = null;

document.addEventListener("click", event => {
    const link = event.target.closest("[data-job]");

    if (link) {
        pendingJob = link.dataset.job;

        if (link.dataset.src) {
            pendingSrc = link.dataset.src;
        }
    }
});


/* =========================================
   24. RENDER SERVICE PAGES
========================================= */

function renderSector(key) {
    const page = S[key];
    const offer = CFG.offer;

    $("#v-sector").innerHTML = `
        <section class="phero">
            <div class="wrap">
                <div>
                    <p class="crumb">
                        <a href="#home">Home</a> / ${page.k}
                    </p>

                    <h1>${page.t}</h1>
                    <p>${page.l}</p>

                    <div class="ctas">
                        <a
                            class="btn btn-dark"
                            href="#book"
                            data-job="${page.job}"
                            data-src="${key}"
                        >Book a pickup</a>

                        <a
                            class="btn btn-light"
                            href="sms:+1${digits}"
                        >Text us a photo</a>
                    </div>

                    ${page.situation && offer ? `
                        <div class="offer">
                            <div>
                                <b>${offer.title}</b>
                                <span>${offer.text}</span>
                            </div>
                            <code>${offer.code}</code>
                        </div>
                    ` : ""}
                </div>

                <div class="pim">
                    <img src="img/${page.h}.jpg" alt="">
                </div>
            </div>
        </section>

        ${page.situation ? "" : `
            <nav class="tabs" aria-label="Sectors">
                <div class="wrap">
                    ${Object.keys(S)
                        .filter(k => !S[k].situation)
                        .map(k => `
                            <a href="#${k}" class="${k === key ? "on" : ""}">
                                ${S[k].k}
                            </a>
                        `).join("")}
                </div>
            </nav>
        `}

        <section style="padding-top:30px">
            <div class="wrap rows">
                ${page.s.map(service => `
                    <div class="row">
                        <div class="ri">
                            <img
                                src="img/${service[0]}.jpg"
                                alt="${service[1]}"
                                loading="lazy"
                            >
                        </div>

                        <div>
                            <h3>${service[1]}</h3>
                            <p>${service[2]}</p>

                            <ul>
                                ${service[3].map(item => `
                                    <li>${item}</li>
                                `).join("")}
                            </ul>

                            <a
                                class="link arrow"
                                href="#book"
                                data-job="${service[4]}"
                            >Get a price</a>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>

        <section style="padding-top:20px">
            <div class="wrap">
                <div class="shead">
                    <h2>Why people call us back</h2>
                </div>

                <div class="three">
                    ${page.w.map(item => `
                        <div>
                            <h3>${item[0]}</h3>
                            <p>${item[1]}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        </section>

        <section style="padding-top:20px">
            <div class="wrap">
                <div class="band">
                    <div>
                        <h2>Ready to make room?</h2>
                        <p>
                            Text a photo for a price,
                            or book a time that suits you.
                        </p>
                    </div>

                    <div class="ctas">
                        <a
                            class="btn btn-white"
                            href="#book"
                            data-job="${page.job}"
                        >Book a pickup</a>

                        <a
                            class="btn btn-ghostw"
                            href="tel:+1${digits}"
                        >Call ${CFG.phone}</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}


/* =========================================
   25. WEBSITE PAGE ROUTER
========================================= */

const VIEWS = [
    "home",
    "services",
    "pricing",
    "area",
    "about",
    "book",
    "privacy"
];

function route() {
    let hash = location.hash.slice(1) || "home";

    $$(".view").forEach(view => {
        view.classList.remove("on");
    });

    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", false);

    if (S[hash]) {
        renderSector(hash);

        $("#v-sector").classList.add("on");
    } else {
        if (!VIEWS.includes(hash)) {
            hash = "home";
        }

        $("#v-" + hash).classList.add("on");

        if (hash === "book") {
            const select = $("#qjob");

            if (pendingJob) {
                [...select.options].forEach((option, index) => {
                    if (option.text === pendingJob) {
                        select.selectedIndex = index;
                    }
                });

                pendingJob = null;
            }

            if (pendingSrc) {
                $("#qsrc").value = pendingSrc;

                if (CFG.offer) {
                    $("#qpromo").value = CFG.offer.code;
                }

                pendingSrc = null;
            }
        }
    }

    $$("nav.main a").forEach(link => {
        const key = link.getAttribute("href").slice(1);

        link.classList.toggle(
            "on",
            key === hash ||
            (key === "services" && !!S[hash])
        );
    });

    scrollTo(0, 0);
}

addEventListener("hashchange", route);

route();


/* =========================================
   END OF TOSS-IT MAIN JAVASCRIPT
========================================= */

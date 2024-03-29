function spinner() {
  document.onreadystatechange = async () => {
    if (document.readyState === "complete") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      document.getElementById("preloader").style.display = "none";
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
  };
}
spinner();

function setActiveNavLink() {
  const navLinksElemnts = document.querySelectorAll("[data-nav-link]");
  const navLinks = [...navLinksElemnts];
  const sectionElemnts = document.querySelectorAll("[data-section]");
  const sections = [...sectionElemnts];
  function setNavFromView() {
    function handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let sectionAtt = entry.target.getAttribute("data-section");
          navLinks.forEach((link) => {
            let linkAtt = link.getAttribute("data-nav-link");
            if (linkAtt == sectionAtt) {
              link.classList.add("active-section");
            } else {
              link.classList.remove("active-section");
            }
          });
        }
      });
    }
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
  setNavFromView();
  function setNavFromLink() {
    function handleHash() {
      let hash = window.location.hash.substring(1);
      navLinks.forEach((link) => {
        let linkAtt = link.getAttribute("data-nav-link");
        if (linkAtt == hash) {
          link.classList.add("active-section");
        } else {
          link.classList.remove("active-section");
        }
      });
    }
    window.addEventListener("hashchange", (e) => {
      handleHash();
    });
    handleHash();
  }
  setNavFromLink();
}

setActiveNavLink();

function animateBlobs() {
  const blobGroup1 = [
    "M281.603 33.0591C339.976 40.6804 406.072 28.402 447.334 70.3889C488.418 112.194 470.794 178.43 481.159 236.12C495.954 318.472 561.806 402.009 519.928 474.444C474.629 552.796 372.101 582.308 281.603 581.285C192.001 580.273 104.817 538.902 48.6051 469.118C-2.98032 405.077 0.366379 318.291 3.57125 236.12C6.60167 158.422 3.30492 66.475 66.0979 20.6142C126.504 -23.5036 207.431 23.3751 281.603 33.0591Z",
    "M258.785 8.32328C340.728 0.886022 437.011 -11.4254 492.693 49.1504C547.72 109.013 528.704 203.626 511.327 283.059C497.872 344.562 457.293 392.94 408.722 432.996C365.712 468.467 313.884 482.832 258.785 491.328C188.7 502.135 109.185 532.417 54.1767 487.667C-2.53224 441.533 1.01368 356.142 2.77428 283.059C4.47933 212.281 15.5377 139.873 63.803 88.077C113.569 34.671 186.084 14.9217 258.785 8.32328Z",
    "M277.104 2.09536C350.427 4.92933 399.626 73.1595 445.6 130.35C485.217 179.633 516.786 235.624 515.652 298.846C514.536 361.017 476.026 410.965 439.66 461.402C392.24 527.17 358.184 629.959 277.104 629.698C196.013 629.437 167.407 522.735 115.59 460.36C71.8999 407.767 6.33396 367.097 2.25531 298.846C-1.96855 228.166 46.9449 168.749 95.0589 116.801C145.724 62.0988 202.598 -0.784293 277.104 2.09536Z",
    "M347.923 33.5851C429.992 34.537 519.384 -24.55 584.628 25.2433C652.068 76.7122 666.635 179.38 647.148 261.948C630.303 333.323 551.678 362.669 494.232 408.257C447.442 445.388 405.595 483.85 347.923 499.407C262.621 522.418 166.348 566.373 93.52 516.351C16.3139 463.322 -0.087828 355.584 2.20151 261.948C4.43268 170.692 29.4959 69.9993 105.663 19.6878C175.825 -26.657 263.843 32.6099 347.923 33.5851Z",
    "M271.904 24.9371C351.682 24.9707 434.626 -16.769 502.126 25.7541C580.601 75.1913 640.814 163.252 638.647 255.976C636.507 347.561 567.661 424.605 491.614 475.685C427.951 518.448 348.579 500.712 271.904 502.317C192.308 503.983 100.969 539.438 42.8001 485.08C-15.8586 430.264 8.52501 336.26 8.29587 255.976C8.06564 175.308 -19.177 78.7301 41.4887 25.56C101.535 -27.0671 192.06 24.9035 271.904 24.9371Z",
    "M281.532 5.44622C358.426 20.5286 388.121 109.701 430.342 175.713C459.981 222.053 480.073 269.795 485.611 324.523C492.017 387.825 496.062 451.972 463.849 506.84C420.675 580.377 366.661 667.161 281.532 672.122C195.155 677.157 130.736 596.94 76.6481 529.407C29.496 470.533 6.06296 399.894 3.13747 324.523C0.0645656 245.354 8.013 162.792 60.101 103.092C115.234 39.903 199.24 -10.6949 281.532 5.44622Z",
  ];
  const blobGroup2 = [
    "M267.709 4.9265C350.475 -7.85561 443.36 21.5108 494.814 87.5878C543.257 149.799 508.995 235.844 508.921 314.692C508.848 393.403 553.252 489.118 494.388 541.372C435.556 593.598 346.32 531.858 267.709 528.82C195.044 526.012 114.211 570.514 57.8975 524.504C-0.125298 477.098 -2.97391 389.124 5.6276 314.692C13.2625 248.625 58.4102 199.123 101.367 148.35C150.526 90.2472 192.492 16.5427 267.709 4.9265Z",
    "M328.789 4.95578C397.241 11.3753 468.805 31.1637 509.695 86.4352C547.078 136.965 513.675 205.168 522.905 267.341C535.577 352.7 613.318 435.15 572.773 511.326C528.453 594.594 422.909 638.321 328.789 632.047C238.333 626.016 175.797 548.348 115.302 480.829C59.4162 418.455 2.96389 351.084 2.02114 267.341C1.07019 182.87 44.5706 101.884 110.44 48.9926C170.625 0.66584 251.94 -2.25119 328.789 4.95578Z",
    "M198.281 7.28657C277.225 -6.03893 369.656 3.40755 422.33 63.7008C473.633 122.425 458.615 211.291 443.301 287.75C431.233 348.007 387.535 390.355 347.559 437.028C301.918 490.314 268.274 568.966 198.281 573.814C126.983 578.753 66.8053 518.459 26.7833 459.248C-6.76525 409.614 2.7234 347.618 4.92424 287.75C6.99832 231.33 6.89973 174.896 38.9452 128.414C78.3119 71.3133 129.892 18.8303 198.281 7.28657Z",
    "M244.445 2.0412C317.857 0.787571 391.963 28.1441 439.958 83.7077C485.349 136.255 480.353 209.873 483.87 279.221C487.689 354.535 506.125 435.317 460.848 495.624C411.031 561.98 327.298 602.642 244.445 598.128C164.605 593.778 98.7844 536.923 50.4032 473.263C8.47515 418.094 1.15745 348.508 2.07909 279.221C2.98408 211.186 10.7098 141.494 55.4977 90.273C103.064 35.8747 172.195 3.27501 244.445 2.0412Z",
    "M361.495 2.69048C427.021 8.30562 469.356 64.3829 522.725 102.813C595.344 155.103 712.499 175.359 724.45 264.043C736.489 353.375 652.668 433.426 572.949 475.497C507.86 509.848 433.604 470.317 361.495 455.592C310.895 445.26 267.299 428.13 221.754 403.784C142.468 361.402 17.0285 352.87 3.15922 264.043C-10.4178 177.088 98.9365 124.451 170.042 72.59C227.103 30.9721 291.127 -3.33963 361.495 2.69048Z",
    "M248.175 7.15258C312.915 14.7477 366.523 51.0064 414.36 95.2849C464.84 142.011 518.905 192.801 522.927 261.469C527.111 332.904 481.099 393.571 435.036 448.331C382.985 510.211 328.71 580.845 248.175 588.099C163.164 595.757 73.5012 555.087 24.3189 485.326C-20.3963 421.9 15.4887 339.035 17.8995 261.469C20.1742 188.284 -11.3307 105.386 37.8149 51.1092C87.7984 -4.09275 174.213 -1.52448 248.175 7.15258Z",
  ];
  const blobGroup3 = [
    "M281.603 33.0591C339.976 40.6804 406.072 28.402 447.334 70.3889C488.418 112.194 470.794 178.43 481.159 236.12C495.954 318.472 561.806 402.009 519.928 474.444C474.629 552.796 372.101 582.308 281.603 581.285C192.001 580.273 104.817 538.902 48.6051 469.118C-2.98032 405.077 0.366379 318.291 3.57125 236.12C6.60167 158.422 3.30492 66.475 66.0979 20.6142C126.504 -23.5036 207.431 23.3751 281.603 33.0591Z",
    "M357.702 2.05553C417.783 2.86781 484.584 1.45866 525.607 45.3626C565.937 88.5242 554.332 154.202 555.056 213.268C555.795 273.531 564.487 336.075 529.776 385.343C489.225 442.9 427.868 487.568 357.702 493.389C282.668 499.614 213.619 463.09 154.494 416.476C85.4242 362.021 -4.76142 300.931 2.40138 213.268C9.49416 126.463 110.328 85.2652 185.193 40.7604C237.855 9.455 296.443 1.22735 357.702 2.05553Z",
    "M365.988 2.00932C445.502 2.83417 510.773 56.3471 567.155 112.421C623.738 168.697 686.584 234.119 679.272 313.587C672.223 390.204 594.375 434.12 533.256 480.855C483.096 519.209 428.934 548.159 365.988 553.138C296.629 558.626 228.099 547.846 169.982 509.594C95.2698 460.419 4.12427 403.006 2.03518 313.587C-0.0648871 223.699 92.3017 166.677 160.604 108.204C221.468 56.0987 285.872 1.17821 365.988 2.00932Z",
    "M226.365 2.03815C303.194 3.7411 356.549 71.8896 408.589 128.436C457.571 181.658 514.964 238.473 510.395 310.66C505.962 380.704 436.806 421.846 386.894 471.189C337.465 520.054 295.862 590.346 226.365 591.452C156.462 592.564 103.966 531.252 60.6448 476.38C23.0868 428.807 8.88668 371.125 4.68284 310.66C0.0437782 243.934 -3.14149 174.499 35.8798 120.174C81.1927 57.0907 148.713 0.316964 226.365 2.03815Z",
    "M203.545 2.22678C287.005 -2.55173 352.804 69.0669 405.81 133.71C452.94 191.186 476.688 261.648 477.215 335.975C477.746 410.923 463.381 489.871 408.699 541.128C355.231 591.247 276.279 601.475 203.545 592.502C139.27 584.572 82.7769 547.524 43.4521 496.068C8.92743 450.892 10.8771 392.732 7.49876 335.975C3.77126 273.352 -8.58664 209.709 23.1875 155.617C64.7421 84.8748 121.635 6.91656 203.545 2.22678Z",
    "M236.132 2.39966C318.651 7.29617 340.396 118.496 400.11 175.658C462.613 235.491 569.711 255.156 588.419 339.635C608.967 432.421 575.069 548.312 493.393 596.896C415.471 643.248 324.058 571.318 236.132 549.192C181.154 535.357 124.435 531.399 82.3151 493.453C37.8219 453.368 8.96195 399.275 3.52668 339.635C-2.47359 273.796 13.9302 209.392 51.4672 154.97C98.5963 86.6416 153.273 -2.51711 236.132 2.39966Z",
  ];
  const timeline = anime.timeline({
    duration: 10000,
    easing: "easeInOutSine",
    loop: true,
    direction: "alternate",
  });
  timeline.add(
    {
      targets: "#blob-1",
      d: [
        { value: blobGroup1[0] },
        { value: blobGroup1[1] },
        { value: blobGroup1[2] },
        { value: blobGroup1[3] },
        { value: blobGroup1[4] },
        { value: blobGroup1[5] },
      ],
    }
    //   "-= 5000"
  );
  timeline.add(
    {
      targets: "#blob-2",
      d: [
        { value: blobGroup2[0] },
        { value: blobGroup2[1] },
        { value: blobGroup2[2] },
        { value: blobGroup2[3] },
        { value: blobGroup2[4] },
        { value: blobGroup2[5] },
      ],
    },
    "-= 9000"
  );
  timeline.add(
    {
      targets: "#blob-3",
      d: [
        { value: blobGroup3[0] },
        { value: blobGroup3[1] },
        { value: blobGroup3[2] },
        { value: blobGroup3[3] },
        { value: blobGroup3[4] },
        { value: blobGroup3[5] },
      ],
    },
    "-= 7500"
  );
}

animateBlobs();

function reviews() {
  const allReviewsArr = document.querySelectorAll("[data-review]");
  const allReviews = [...allReviewsArr];
  const allReviewsCount = allReviews.length;
  const firstReview = document.querySelector("[data-review='1']");
  const reviews = document.querySelector("[data-reviews]");
  const clientImgsArr = document.querySelectorAll("[data-client-img]");
  const clientImgs = [...clientImgsArr];
  const reviewIndicatorsArray = document.querySelectorAll("[data-review-btn]");
  const reviewIndicators = [...reviewIndicatorsArray];
  let activeReview = 0;
  let reviewChangeWorker;

  function changeReview() {
    reviews.classList.add("opacity-0");
    clientImgs.forEach((img) => {
      img.classList.remove("after:-translate-x-2");
      img.classList.remove("after:-translate-y-2");
    });
    reviews.addEventListener(
      "transitionend",
      () => {
        if (!(activeReview < allReviewsCount)) {
          activeReview = 0;
        }
        let relatedBtn = document.querySelector(`[data-review-btn="${activeReview + 1}"]`);
        reviewBtn(relatedBtn);
        firstReview.style.marginLeft = `-${100 * activeReview}%`;
        reviews.classList.remove("opacity-0");
        clientImgs.forEach((img) => {
          img.classList.add("after:-translate-x-2");
          img.classList.add("after:-translate-y-2");
        });
      },
      {
        once: true,
      }
    );
  }

  function autoChangeReview() {
    reviewChangeWorker = setInterval(async () => {
      activeReview++;
      changeReview();
    }, 7000);
  }
  autoChangeReview();

  function reviewBtn(element) {
    reviewIndicators.forEach((btn) => {
      btn.disabled = false;
      let indicatorMain = btn.querySelector("[data-indicator]");
      indicatorMain.classList.remove("top-0");
      indicatorMain.classList.add("top-full");
    });
    element.querySelector("[data-indicator]").classList.remove("top-full");
    element.querySelector("[data-indicator]").classList.add("top-0");
    element.disabled = true;
  }

  function changeReviewByBtn() {
    reviewIndicators.forEach((indicator) => {
      indicator.addEventListener("click", async () => {
        reviewBtn(indicator);
        let btnAtt = Number(indicator.getAttribute("data-review-btn"));
        activeReview = btnAtt - 1;
        await new Promise((resolve) => setTimeout(resolve, 0));
        clearInterval(reviewChangeWorker);
        changeReview();
        autoChangeReview();
      });
    });
  }
  changeReviewByBtn();
}

reviews();

async function popAlert(message) {
  const alertPopUp = document.getElementById("alert");
  const alertText = document.getElementById("alert-text");
  async function showAlert() {
    alertText.innerText = message;
    await new Promise((resolve) => setTimeout(resolve, 0));
    alertPopUp.classList.remove("hidden");
    await new Promise((resolve) => setTimeout(resolve, 10));
    alertPopUp.classList.remove("before:-translate-x-0");
    alertPopUp.classList.remove("before:-translate-y-0");
    alertPopUp.classList.add("before:-translate-x-2");
    alertPopUp.classList.add("before:-translate-y-2");
  }

  async function hideAlert() {
    alertPopUp.classList.remove("before:-translate-x-2");
    alertPopUp.classList.remove("before:-translate-y-2");
    alertPopUp.classList.add("before:-translate-x-0");
    alertPopUp.classList.add("before:-translate-y-0");
    alertPopUp.addEventListener(
      "transitionend",
      async () => {
        alertPopUp.classList.add("hidden");
      },
      {
        once: true,
      }
    );
  }

  showAlert();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  hideAlert();
}

function contact() {
  const sendBtn = document.getElementById("send");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const eMail = document.getElementById("e-mail");
  const topic = document.getElementById("topic");
  const words = document.getElementById("words");
  const clickOrTouch = "ontouchstart" in window ? "touchstart" : "click";
  //

  sendBtn.addEventListener(clickOrTouch, async (event) => {
    event.preventDefault();
    document.getElementById("preloader").style.display = "flex";
    document.getElementById("preloader").style.backgroundColor = "hwb(52 91% 0% / 0.5)";
    // document.querySelector("body").classList.add("overflow-y-hidden");
    // let request = new XMLHttpRequest();
    let form = new FormData();

    form.append("first_name", firstName.value);
    form.append("last_name", lastName.value);
    form.append("e_mail", eMail.value);
    form.append("topic", topic.value);
    form.append("words", words.value);

    let request = await fetch("https://luke-fernando-backend.vercel.app/api/index.php", {
      method: "POST",
      body: form,
    });

    let response = request.text();
    const responseText = await response.then((value) => value);
    document.getElementById("preloader").style.display = "none";
    document.getElementById("preloader").style.backgroundColor = "#fffce8";
    // document.querySelector("body").classList.remove("overflow-y-hidden");
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (responseText == "success") {
      popAlert("message sent successfully!");
      // alert.classList.add("show-alert");
      // await new Promise((resolve) => setTimeout(resolve, 0));
      // alert.classList.add("pop-alert");
      // errorAlert.classList.remove("alert-error");
      // successAlert.classList.add("alert-success");
      // document.querySelector('[data-alert-text="success"]').innerText = "Thank you for contacting us!";
      // alert("success!");
    } else {
      popAlert(responseText);
      // alert.classList.add("show-alert");
      // await new Promise((resolve) => setTimeout(resolve, 0));
      // alert.classList.add("pop-alert");
      // successAlert.classList.remove("alert-success");
      // errorAlert.classList.add("alert-error");
      // document.querySelector('[data-alert-text="error"]').innerText = responseText;
      // alert("error!");
    }
  });
  // alertClose.addEventListener(clickOrTouch, async (event) => {
  //   event.preventDefault();
  //   alert.classList.remove("pop-alert");
  //   await new Promise((resolve) => setTimeout(resolve, 0));
  //   alert.classList.add("pop-alert-reverse");
  //   alert.addEventListener(
  //     "animationend",
  //     () => {
  //       alert.classList.remove("show-alert");
  //       alert.classList.remove("pop-alert-reverse");
  //     },
  //     {
  //       once: true,
  //     }
  //   );
  // });
  //
}

contact();

const mesureWidth = (item) => { //???
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest('.product-menu');
    const titlesBlock = container.find('.product-menu__button');
    const titleWidth = titlesBlock.width() * titlesBlock.length;

    const isTablet = window.matchMedia("(max-width:768px)").matches;
    const isMobile = window.matchMedia("(max-width:480px)").matches;

    if (isTablet) {
        reqItemWidth = screenWidth - titleWidth;

    }

    if (isMobile) {
        reqItemWidth = screenWidth - titlesBlock.width();
    }

    if (!isTablet && !isMobile) {
        reqItemWidth = 524;
    }
    return reqItemWidth;
}

const closeEveryItemContainer = container => {
    const items = container.find(".product-menu__item");
    const content = container.find(".product-menu__content");

    items.removeClass("active");
    content.width(0);
}
const openItemAcco = item => {
    const hiddenContent = item.find(".product-menu__content");
    const reqWidth = mesureWidth(item);

    const textBlock = item.find('.product-menu__text');
    item.addClass("active");

    hiddenContent.width(reqWidth);
    textBlock.width(reqWidth - 60);

}
$(".product-menu__button").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".product-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".product-menu");

    if (itemOpened) {
        closeEveryItemContainer(container)

    } else {
        closeEveryItemContainer(container)
        openItemAcco(item);
    }
});

$(".product-menu__close").on("click", e => {
    e.preventDefault();
    closeEveryItemContainer($('.product-menu'));
})
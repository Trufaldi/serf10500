// функция поиска отзыва по псевдониму
// константа найтиБлокПоПсевдониму = псевдоним => 
// function findBlockByAlias (alias) {
// функция найтиБлокПоПсевдониму (псевдоним)
const findBlockByAlias = alias => {
    // вернуть  $(".user__rewiev") .отзывы.отфильтровать(номер, отзыв) => {
    return $(".user__rewiew").filter((ndx, item) => {
        //вернуть отзыв у которого значение атрибута data-linked-with РАВНО переданному псведониму
        // <li class="user__rewiew user__rewiew--active" data-linked-with="one">
        // вернуть $(отзыв).атрибут("data-linked-with") === псевдоним
        return $(item).attr("data-linked-with") === alias
    });
};

// следим за кликами по элементу с классом user__link
$(".user__link").click((e) => {
    // запрещаем действие по умолчанию(переход по ссылке)
    e.preventDefault();

    // находим непосредственно сам элемент, на который произощел клик  <a href="" class="user__link" data-open="one">
    const $this = $(e.currentTarget); //клик
    const target = $this.attr("data-open"); //считываем у этого элемента значение атрибута data-open="one". Значение one
    const itemToShow = findBlockByAlias(target); // вызов функции целиком отзыв. по этому значению вызываем функцию findBlockByAlias, которая вернет нам отзыв с таким же названием
    const curItem = $this.closest(".user"); //найти ближайшего родителя с классом юзер/портрет

    itemToShow.addClass("user__rewiew--active").siblings().removeClass("user__rewiew--active") // на отзыв ставим активный класс, а с его соседей снимаем активный класс
    curItem.addClass("user--active").siblings().removeClass("user--active"); // на сам портрет ставим активны класс, а с соседей снимаем
});

// data - пользлвательский атрибут возможности html5
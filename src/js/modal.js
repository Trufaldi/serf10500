// функция валидации полей (форма, массивПолей)
const validateFields = (form, fieldsArray) => {

    // массивПолей.дляКаждого(поле  => {
    fieldsArray.forEach(field => {
        // поле.удалитьКласс("input-error");
        field.removeClass("input-error");
        // если (поле.значение().убратьПробелы() === "")
        if (field.val().trim() === "") {
            // поле.добавитьКласс("input-error");
            field.addClass("input-error");
        }
    });
    // поляСОшибками = форма.найти(".input-error");
    const errorFields = form.find(".input-error");
    // вернуть поляСОшибками.количество === 0
    return errorFields.length === 0;
}

// форма.отправка(событиеОтправки => {
$(".form").submit(e => {
    // событиеОтправки.запретитьСтандартноеПоведение()
    e.preventDefault();
    // форма = $(событиеОтправки.текущаяЦель)
    const form = $(e.currentTarget);
    // имя = форма.найти("[name='name']");
    const name = form.find("[name='name']");
    // телефон = форма.найти("[name='phone']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    // модальноеОкно = $("#modal");
    const modal = $("#modal");
    // контент = модальноеОкно.найти(".modal__content");
    const content = modal.find(".modal__content");
    // модальноеОкно.убратьКласс("modal-error");
    modal.removeClass("modal-error");

    // являетсяВалидной = валидироватьПоля(форма, [имя, телефон, комментарий, куда]);
    const isValid = validateFields(form, [name, phone, comment, to]);

    // если форма является валидной
    if (isValid) {
        // const запрос = $.ajax({ // отправляет запрос по адресу
        const request = $.ajax({
            // адрес: "https://webdev-api.loftschool.com/sendmail",
            url: "https://webdev-api.loftschool.com/sendmail",
            // метод отправки данных
            method: "post",
            // отправляемые данные
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },

        });
        // request в данном случае это ответ от адреса, на который мы отправили данные
        // запрос.завершен((данные) => {
        request.done((data) => {
            // контент.текст(данные.сообщение)
            content.text(data.message);
        });
        // запрос.неудача((данные) => {
        request.fail((data) => {
            // сообщение = данные.ответJSON.сообщение
            const message = data.responseJSON.message;
            // контент.текст(сообщение)
            content.text(message);
            // модалка.добавитьКласс("modal-error");
            modal.addClass("modal-error");
        });
        // при любом ответе
        // запрос.всегда((данные) => {
        request.always((data) => {
            // фенсибокс.открыть
            $.fancybox.open({
                // источник: '#modal',
                src: '#modal',
                // тип : 'inline'
                type: 'inline'
            });
        });

    }
    // {} -это объект

});
// кнопка закрытия модалки при клике
$(".app-submit-button").click(e => {
    e.preventDefault();
    // фенсибокс.закрыть
    $.fancybox.close();
})
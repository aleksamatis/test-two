import axios from 'axios';
import { Footer } from 'element-ui';

const baseUrl = "https://europe-west1-st-web-test.cloudfunctions.net";

export default {
    register() {
        const url = baseUrl + "/api/auth";
        return axios.post(url).then(result => {
            return result.data.token;
        });
    },
    getReminders(token) {
        const url = baseUrl + "/api/reminders";
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        return axios.get(url, {headers}).then(result => {
            return result.data;
        });
    },
    createReminder(token, note, date) {
       /// подготовить правильный урл
       /// подготовить напоминалку в нужном формате {note, date}
       /// отправить пост запрос с данными из пердыдущего пункта и не забыть передать заголовок
       /// вернуть результат
    },
    updateReminder(token, reminder) {

    },
    deleteReminder(token, reminder) {

    }
};
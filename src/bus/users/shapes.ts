import * as Yup from 'yup';

const phoneRegExp = /^7\d{10}$/;
const dateRegExp = /^\d{2}\.\d{2}\.\d{4}/;

export const usersShape = {
    administration: {
        shape: {
            Search: '',
        },
    },
    contacts: {
        shape: {
            Search: '',
            type: 'normal',
            dropDown: false,
        },
    },
    addUser: {
        schemas: {
            draft: Yup.object().shape({
                name: Yup.string().required('Необходимо ввести имя'),
                surname: Yup.string().required('Необходимо ввести фамилию'),
                patronymic: Yup.string().required(
                    'Необходимо ввести отчетство',
                ),
                externalCompanyName: Yup.string().required(
                    'Необходимо указать компанию',
                ),
            }),
            save: Yup.object().shape({
                name: Yup.string().required('Необходимо ввести имя'),
                surname: Yup.string().required('Необходимо ввести фамилию'),
                patronymic: Yup.string().required(
                    'Необходимо ввести отчетство',
                ),
                externalCompanyName: Yup.string().required(
                    'Необходимо указать компанию',
                ),
                tabN: Yup.string().required(
                    'Необходимо указать табельный номер',
                ),
                email: Yup.string().required('Необходимо указать Email'),
                phone: Yup.string()
                    .required('Необходимо указать телефон')
                    .matches(phoneRegExp, 'Телефон в формате 7ХХХХХХХХХХ'),
                sex: Yup.number().required('Необходимо указать пол'),
                birthDate: Yup.string().matches(
                    dateRegExp,
                    'Необходима корректная дата',
                ),
            }),
        },
    },
};

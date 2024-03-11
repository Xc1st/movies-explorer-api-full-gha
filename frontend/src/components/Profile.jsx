/* eslint-disable react/prop-types */
import {useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation";
import Form from "./Form";

export default function Profile({ name, loggedIn, exit, editUserData, setIsError, isSuccess, setIsSuccess, setIsEdit, isEdit }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

    useEffect(() => {
        reset({ username: currentUser.name, email: currentUser.email })
    }, [reset, currentUser, isEdit])

    function onSubmit(e) {
        e.preventDefault()
        editUserData(values.username, values.email)
    }
    return (
        <>
            <Header
                black={true}
                loggedIn={loggedIn}
            />
            <main>
                <section className="profile">
                    <div className="container container_profile">
                        <h1 className="profile__title"> Привет, {currentUser.name}</h1>
                        <Form
                            name={name}
                            isValid={isValid}
                            onSubmit={onSubmit}
                            setIsError={setIsError}
                            values={values}
                            isSuccess={isSuccess}
                            setIsSuccess={setIsSuccess}
                            setIsEdit={setIsEdit}
                            titleButton={'Сохранить'}
                            isEdit={isEdit}>
                        
                        <div className="profile__input-cont">
                            <h2 className="profile__input-name"> Имя</h2>
                            <Input
                                placeholder={'Введите имя'}
                                value={values.username}
                                isInputValid={isInputValid.email}
                                error={errors.email}
                                onChange={handleChange}
                                name='username'
                                disabled={isEdit ? false : true} />
                                
                        </div>
                        <div className="profile__input-cont">
                            <h2 className="profile__input-name"> E-mail</h2>
                            <Input
                                value={values.email}
                                isInputValid={isInputValid.email}
                                error={errors.email}
                                onChange={handleChange}
                                required
                                name='email'
                                placeholder={'Ведите Email'}
                                disabled={isEdit ? false : true} />
                        </div>
                        {isEdit ? '' :
                        <>
                        <button type="button" className="profile__edit button" onClick={() => setIsEdit(true)}>Редактировать</button>
                            {/* <button className="profile__submit button">Сохранить</button> */}
                                <Link to="/" className="profile__exit button" onClick={exit}>Выйти из аккаунта</Link>
                            </>}
                            </Form>
                    </div>
                </section>
            </main >
        </>
    )
}
/* eslint-disable react/prop-types */
import EntryPage from './EntryPage';
import Input from './Input';
import useFormValidation from "../hooks/useFormValidation";

export default function Login({ name, setIsError, onSignIn }) {
    const { values, errors, isInputValid, isValid, handleChange } = useFormValidation()

    function onSubmit(evt) {
        evt.preventDefault()
        onSignIn(values.email, values.password)
    }
    return (
        <EntryPage name={name} setIsError={setIsError} isValid={isValid} onSubmit={onSubmit}>
            <Input
                isInputValid={isInputValid.email}
                value={values.email}
                error={errors.email}
                minLength={2}
                maxLength={30}
                required
                name={'email'}
                type={'email'}
                placeholder={'Введите Email'}
                onChange={(evt) => {
                    handleChange(evt)
                    setIsError(false)
                }} ></Input>
            <Input
                name={'password'}
                placeholder={'Введите пароль'}
                type='password'
                title='Пароль'
                value={values.password}
                minLength={3}
                isInputValid={isInputValid.password}
                error={errors.password}
                onChange={(evt) => {
                    handleChange(evt)
                    setIsError(false)
                }}
                required
            ></Input>

        </EntryPage>
    )
}
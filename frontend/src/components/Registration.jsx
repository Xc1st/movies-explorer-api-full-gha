/* eslint-disable react/prop-types */
import EntryPage from './EntryPage';
import Input from './Input';
import useFormValidation from '../hooks/useFormValidation'

export default function Registration({ name, onSignUp, setIsError }) {
    const { values, errors, isInputValid, isValid, handleChange } = useFormValidation()

    function onSubmit(evt) {
        evt.preventDefault()
        onSignUp(values.username, values.email, values.password)
    }
    return (
        <EntryPage name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
            <Input
                minLength={2}
                maxLength={30}
                required
                type={'text'}
                name={'username'}
                placeholder={'Введите имя'}
                value={values.username}
                isInputValid={isInputValid.username}
                error={errors.username}
                onChange={(evt) => {
                    handleChange(evt)
                    setIsError(false)
                }}
            ></Input>
            <Input
                type={'email'}
                required
                name={'email'}
                placeholder={'Ведите Email'}
                value={values.email}
                isInputValid={isInputValid.email}
                error={errors.email}
                onChange={(e) => {
                    handleChange(e)
                    setIsError(false)
                }}></Input>
            <Input
                minLength={2}
                maxLength={30}
                required
                type={'password'}
                name={'password'}
                placeholder={'Введите пароль'}
                value={values.password}
                isInputValid={isInputValid.password}
                error={errors.password}
                onChange={(evt) => {
                    handleChange(evt)
                    setIsError(false)
                }}></Input>
        </EntryPage>
    )
}
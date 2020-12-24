import * as Yup from 'yup';
import {Form, Field, Formik, ErrorMessage} from 'formik'
import {useDispatch, useSelector} from 'react-redux';
import {loginApi} from '../services/api/userApi'
import {LoginAction} from '../actions/userActions'

const Login=()=>{
    const dispatch = useDispatch()
    const user= useSelector(state=>state.user)
    console.log(user)
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username'),
        password: Yup.string().required('please enter password')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        await loginApi(values)
        dispatch(LoginAction())
        onSubmitProps.resetForm()
    }
    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <Form>
                            <label htmlFor='username'>User name: </label>
                            <Field name='username' type='text' placeholder='username' />
                            <span style={{color: 'red'}}><ErrorMessage name='username' /></span>

                            <label htmlFor='password'>Password: </label>
                            <Field name='password' type='text' placeholder='password' />
                            <span style={{color: 'red'}}><ErrorMessage name='password' /></span>

                            <button disabled={formik.isSubmitting} type='submit'>
                                {formik.isSubmitting?<>Loggin you in</>:<>Login</>}
                            </button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}
export default Login
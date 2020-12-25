import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import {Form, Field, Formik, ErrorMessage} from 'formik'
import {useDispatch} from 'react-redux';
import {signInApi} from '../services/api/userApi'
import {signInAction} from '../actions/userActions'


const Signin=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username'),
        password: Yup.string().required('please enter password')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        await signInApi(values)
        dispatch(signInAction())
        onSubmitProps.resetForm()
        history.push('/')
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
export default Signin
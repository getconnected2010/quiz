import {useHistory, Link} from 'react-router-dom'
import * as Yup from 'yup';
import {Form, Formik} from 'formik'
import {useDispatch} from 'react-redux';
import {signInApi} from '../services/api'
import {signInAction} from '../actions/userActions'
import {InputField, ButtonComponent} from './FormComponents'


const Signin=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username'),
        password: Yup.string().required('please enter password')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        const status = await signInApi(values)
        dispatch(signInAction())
        onSubmitProps.resetForm()
        if(status===200){
            history.push('/')
        }
    }
    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <Form>
                            <InputField label={'User name: '} name={'username'} type={'text'} placeholder={'username'} />

                            <InputField label={'Password: '} name={'password'} type={'password'} placeholder={'password'} />

                            <ButtonComponent type={'submit'} disabled={formik.isSubmitting} label={formik.isSubmitting?<>Loggin you in</>:<>Login</>} />
                            
                            <span style={{color: 'gray'}}>
                                Sign in with an admin account to add to quiz.
                                <br/>
                                Forgot password or reset account? Click <Link style={{color:'green', fontSize:'1.25em'}} to='/retrieve'>here</Link>.
                            </span>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}
export default Signin
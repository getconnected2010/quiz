import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Yup from 'yup';
import {Form, Formik} from 'formik'
import {useDispatch} from 'react-redux';
import {signInApi} from '../services/api'
import {signInAction} from '../actions/userActions'
import {InputField, ButtonComponent} from './FormComponents'
import AlertModal from './AlertModal';


const Signin=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [status, setStatus] = useState()
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username'),
        password: Yup.string().required('please enter password')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        setStatus(await signInApi(values))
        dispatch(signInAction())
        onSubmitProps.resetForm()
        if(status===200) return history.push('/')
        setOpenModal(true)
    }
    return(
        <>
        <AlertModal openModal={openModal} setOpenModal={setOpenModal} message={status} style={'Error'} />
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <h1>Sign In</h1>
                        <Form>
                            <InputField label={'User name: '} name={'username'} type={'text'} placeholder={'username'} />

                            <InputField label={'Password: '} name={'password'} type={'password'} placeholder={'password'} />

                            <ButtonComponent type={'submit'} disabled={formik.isSubmitting} label={formik.isSubmitting?<>Loggin you in</>:<>Login</>} />
                            
                            <span>
                                Sign in with an admin account to add to quiz.
                                <br/>
                                Forgot password or reset account? Click <Link style={{color:'green', fontSize:'1.25em'}} to='/reset'>here</Link>.
                            </span>
                        </Form>
                    </div>
                )
            }
        </Formik>
        </>
    )
}
export default Signin
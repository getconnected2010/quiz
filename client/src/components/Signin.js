import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Yup from 'yup';
import {Form, Formik} from 'formik'
import {useDispatch} from 'react-redux';
import {signInApi} from '../services/api/userApi'
import {signInAction} from '../actions/userActions'
import {InputField, ButtonComponent} from './FormComponents'
import ModalPage from './ModalPage';


const Signin=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [response, setResponse] = useState()
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username')
                    .min(4)
                    .max(40)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.'),
        password: Yup.string().required('please enter password')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        setResponse(await signInApi(values))
        dispatch(signInAction())
        onSubmitProps.resetForm()
        if(response===200) return history.push('/')
        setOpenModal(true)
    }
    return(
        <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={'Error'} />
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
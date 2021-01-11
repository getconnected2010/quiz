import React from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {upgradeApi} from '../../services/api'

const UpgradeUser = ({setShowUpgrade}) => {
    const upgradeInit={upUser:'', password:''}

    const upgradeSchema= Yup.object({
        upUser: Yup.string().required('username to be upgraded is required'),
        password: Yup.string().required('admin password is required')
    })
    const upgradeSubmit=async(values, onSubmitProps)=>{
        await upgradeApi(values)
        onSubmitProps.resetForm()
    }
    return (
        <Formik initialValues={upgradeInit} validationSchema={upgradeSchema} onSubmit={upgradeSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'upUser'} label={'Username to upgrade:'} type={'text'} placeholder={'username to be upgraded as admin'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} label={'Upgrade username'} />
                        <Link onClick={()=>setShowUpgrade(false)} to='#'>Hide this form</Link>
                    </Form>
                )
            }
        </Formik>
    )
}

export default UpgradeUser

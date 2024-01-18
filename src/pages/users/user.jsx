import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Upload, UploadProps } from 'antd';


import style from "./user.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { createUserThunk, getOneMember, getUserByIdThunk, isMemberCreated, isMemberUpdated, updateUserByThunk } from '../../store/slices/user/user';


const User = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const BASE_URL = process.env.REACT_APP_IMAGE_URL;

    const memberByID = useSelector(getOneMember);
    const isCreated = useSelector(isMemberCreated);
    const isUpdated = useSelector(isMemberUpdated);
    // const teamsError = useSelector(getTeamsErrors);

    const [image, setImage] = useState();

    useEffect(() => {

        if (id)
            dispatch(getUserByIdThunk(id))
    }, [dispatch,id])

    useEffect(() => {

        if (isCreated)
            navigate(`/users/`)
    }, [navigate,isCreated, isUpdated])

    useEffect(() => {
        form.setFieldsValue({
            name: memberByID?.name,
            lastName: memberByID?.surname,
            email: memberByID?.role,
            phone: memberByID?.height,
            password: memberByID?.position,
          
        });
    }, [memberByID]);


    const onFinish = (values) => {

        const datas= {
            data: {
                "name": values.name,
                "lastName": values.lastName,
                "email": values.email,
                "phone": values.phone,
                "password": values.password,
              
            },
            "id": id && id,
        }
       id ? dispatch(updateUserByThunk(datas)) : dispatch(createUserThunk(datas.data));
    };

    return (
        <>
            <h3>{id ? "Edit" : "Add"}</h3>
            <Button title="Back" onClick={()=>{navigate("/users")}} >Back </Button>
            <Form
                name="user"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800 }}              
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                {/* {teamsError ? teamsError.map((errorText, index) => {
                    return <p key={index} className="error">{t(`TEAM.${errorText.message.toUpperCase()}`)}</p>
                })
                    : null
                } */}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required"}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Lastname"
                    name="lastName"
                    rules={[{ required: true, message:  "Lastname is required"}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message:  "Email is required"}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: "Phone is required" }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message:  "Password is required" }]}
                >
                    <Input />
                </Form.Item>             
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="actionButton">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default User;
import { Button, Modal, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByIdThunk, getMembersList, getUsersThunk, isMemberDeleted } from '../../store/slices/user/user';
import { adminLogout } from '../../store/slices/auth/login';


const Users= () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();   

    const  isDeleted = useSelector(isMemberDeleted);
    const membersList = useSelector(getMembersList);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState();

    const showModalDelete = (id) => {
        setOpen(true);
        setId(id);
    };
    const handleDeleteOk = () => {

        setOpen(false);
        dispatch(deleteUserByIdThunk(id))
    }
    const handleDeleteCancel = () => setOpen(false);

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [dispatch])

    useEffect(()=>{

         if(isDeleted)

         dispatch(getUsersThunk());

    },[dispatch,isDeleted])

    const columns = [
        {
            title: "Id",
            dataIndex: 'id',
            key: 'id',          
            render: (_, record, index) => {
                return index+1;
            }
        },
        {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Lastname",
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span onClick={() => { navigate(`/${record.id}`) }} className='link'>Edit</span>
                    <span onClick={() => showModalDelete(record.id)} className='link'>Delete</span>
                </Space>
            ),
        },
    ];
   
    return (
        <>
        <Button title="Logout" onClick={()=>{dispatch(adminLogout())}} >Logout </Button>
            <h3>Users</h3>
            <Button title="Add" onClick={()=>{navigate("/users/add")}} >Add </Button>
            {membersList ? <Table columns={columns} dataSource={membersList} /> : "null"}
            <Modal
                title="DELETE"
                open={open}
                onOk={handleDeleteOk} // Corrected prop names
                onCancel={handleDeleteCancel} // Corrected prop names
            />
        </>

    )
};

export default Users;
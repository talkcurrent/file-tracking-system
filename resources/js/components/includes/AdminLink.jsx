import React from 'react';
import { Link } from 'react-router-dom';

const AdminLink = (props) => {
    const { activeClass } = props;
    return (
        <>
            <Link
                to={ `/super/dashboard` }
                className={ activeClass == "dashboard" ? "active" : "" }
            >
                <i className="fas fa-home"></i><span>{ " " }Dashboard</span>
            </Link>
            <Link
                to={ `/super/profile` }
                className={ activeClass == "profile" ? "active" : "" }
            >
                <i className="fas fa-user"></i><span>{ " " }Profile</span>
            </Link>
            <Link
                to={ `/super/staffs` }
                className={ activeClass == "staffs" ? "active" : "" }
            >
                <i className="fas fa-users"></i><span>{ " " }Staffs</span>
            </Link>
            <Link
                to={ `/super/files` }
                className={ activeClass == "files" ? "active" : "" }
            >
                <i className="fas fa-paperclip"></i><span>{ " " }Files</span>
            </Link>
            <Link
                to={ `/super/archives` }
                className={ activeClass == "archives" ? "active" : "" }
            >
                <i className="far fa-file-archive"></i><span>{ " " }Archives</span>
            </Link>
            <Link
                to={ `/super/express` }
                className={ activeClass == "express" ? "active" : "" }
            >
                <i className="fas fa-plane-departure"></i><span>{ " " }Express</span>
            </Link>
            <Link
                to={ `/super/faculties` }
                className={ activeClass == "faculties" ? "active" : "" }
            >
                <i className="fas fa-building"></i><span>{ " " }Faculties</span>
            </Link>
            <Link
                to={ `/super/departments` }
                className={ activeClass == "departments" ? "active" : "" }
            >
                <i className="fas fa-house-user"></i><span>{ " " }Departments</span>
            </Link>
            <Link
                to={ `/super/trash` }
                className={ activeClass == "trash" ? "active" : "" }
            >
                <i className="fas fa-trash-alt"></i><span>{ " " }Trash</span>
            </Link>
            <Link
                to={ `/super/settings` }
                className={ activeClass == "settings" ? "active" : "" }
            >
                <i className="fas fa-cogs"></i><span>{ " " }Settings</span>
            </Link>

        </>
    );
};

export default AdminLink;

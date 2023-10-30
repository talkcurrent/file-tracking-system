import React from 'react';
import { Link } from 'react-router-dom';

const StaffLink = (props) => {
    const { activeClass } = props;
    return (
        <>
            <Link
                to={ `/dashboard` }
                className={ activeClass == "dashboard" ? "active" : "" }
            >
                <i className="fas fa-home"></i><span>{ " " }Dashboard</span>
            </Link>
            <Link
                to={ `/profile` }
                className={ activeClass == "profile" ? "active" : "" }
            >
                <i className="fas fa-user"></i><span>{ " " }Profile</span>
            </Link>
            <Link
                to={ `/staffs` }
                className={ activeClass == "staffs" ? "active" : "" }
            >
                <i className="fas fa-users"></i><span>{ " " }Staffs</span>
            </Link>
            <Link
                to={ `/files` }
                className={ activeClass == "files" ? "active" : "" }
            >
                <i className="fas fa-paperclip"></i><span>{ " " }Files</span>
            </Link>
            <Link
                to={ `/archives` }
                className={ activeClass == "archives" ? "active" : "" }
            >
                <i className="far fa-file-archive"></i><span>{ " " }Archives</span>
            </Link>
            <Link
                to={ `/express` }
                className={ activeClass == "express" ? "active" : "" }
            >
                <i className="fas fa-plane-departure"></i><span>{ " " }Express</span>
            </Link>
            <Link
                to={ `/faculties` }
                className={ activeClass == "faculties" ? "active" : "" }
            >
                <i className="fas fa-building"></i><span>{ " " }Faculties</span>
            </Link>
            <Link
                to={ `/departments` }
                className={ activeClass == "departments" ? "active" : "" }
            >
                <i className="fas fa-house-user"></i><span>{ " " }Departments</span>
            </Link>
            <Link
                to={ `/settings` }
                className={ activeClass == "settings" ? "active" : "" }
            >
                <i className="fas fa-cogs"></i><span>{ " " }Settings</span>
            </Link>
        </>
    );
};

export default StaffLink;

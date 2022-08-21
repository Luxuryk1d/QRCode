import React from 'react';
import {NavLink} from "react-router-dom";

const Office = props => {
    return (
        <div className="officeInTable">
            <h4>{props.num}</h4>
            <div style={{textAlign: "right"}}>
                <button className="editBtn">
                    <NavLink
                        style={{
                            textDecoration: "none",
                        }}
                        to={"/editOffice/" + props.officeId}>
                        Редактировать
                    </NavLink>
                </button>
            </div>
            <p>{props.nameKg} {props.nameRu} {props.nameEn}</p>

        </div>
    );
};

export default Office;
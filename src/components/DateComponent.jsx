import React, { useEffect, useState } from "react";
import Datepicker from "tailwind-datepicker-react";

export const DateComponent = ({ handleDate, creationDate }) => {
    const [show, setShow] = useState(false);
    const [defaultDate, setDefaultDate] = useState("2022-01-01");

    useEffect(() => {
        if (creationDate && typeof creationDate === 'string') {
            setDefaultDate(creationDate.slice(0, 10));
        }
    }, [creationDate]);
    
    
    const handleChange = (selectedDate) => {
        handleDate(selectedDate);
    };

    const handleClose = (state) => {
        setShow(state);
    };

    const options = {
        title: "Creation Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-31"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-red-500",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }
    };

    return (
        <div>
            <Datepicker options={options} value={defaultDate ? new Date(defaultDate) : null} onChange={handleChange} show={show} setShow={handleClose} />
        </div>
    );
};

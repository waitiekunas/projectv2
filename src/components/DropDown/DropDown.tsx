import { Link } from 'gatsby';
import React from 'react';
import { useSelector } from 'react-redux';

import { translations } from '../../resources/translations/translations';
import { Box } from '../Box/Box';
import Button from '../Button/Button';

const DropDown = () => {
  const language = useSelector((state: any) => state.language.language)
  const topicNames = useSelector((state: any) => state.lookups.lookups)
  const handleClick = e => {
    e.preventDefault()
    console.log("clicked")
  }

  return (
    <Box
      size={{
        maxWidth: "200px",
        width: "25%",
        height: "42px",
      }}
      flex={{
        direction: "column",
        justify: "center",
      }}
      align={{ self: "center" }}
    >
      <div className="dropdown">
        <Button
          handleClick={handleClick}
          classButtonDiv="flex-col navbar-btn flex-col flex justify-center w-full"
          classButton={
            "button-navbar-padding h-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"
          }
          buttonTexts={translations}
          label={"dropDownButton"}
          language={language}
        />
        <div className="dropdown-content flex justify-around flex-col">
          {topicNames.map((value, index) => (
            <Link
              className={"dropdown-link"}
              to={`/topics-screen/`}
              state={{ topic: value }}
              key={index}
            >
              {value}
            </Link>
          ))}
        </div>
      </div>
    </Box>
  )
}

export default DropDown

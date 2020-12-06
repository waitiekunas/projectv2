import React from 'react';

import { Box } from '../../components/Box/Box';
import { Button } from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';
import { ClassList } from '../ClassList/ClassList';

const handleClick = e => {
  e.preventDefault()
  console.log("clicked")
}
const ClassListFullContent = () => {
  return (
    <div className={"max-height-40-proc flex justify-center flex-col"}>
      <div className={"flex justify-center flex-row"}>
        <h2>Our products</h2>
      </div>

      <ClassList />
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
        <Button
          handleClick={handleClick}
          label={"subscriptions"}
          language={Languages.LITHUANIA}
          variant="contained"
          color="primary"
        />
      </Box>
    </div>
  )
}

export default ClassListFullContent

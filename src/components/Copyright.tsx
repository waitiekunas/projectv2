import React from 'react';

class Copyright extends React.Component {
    creationYear = 2019;

    resolveYear() {
        let date = new Date();
        let year = date.getFullYear();
        return year !== this.creationYear ? " - " + year : '';
    }

    render() {
        return (
            <div className={'flex justify-center'}>
                <h2>{`\u00A9 ${this.creationYear}${this.resolveYear()} Our company`}</h2>
            </div>

        )
    }
}

export default Copyright;
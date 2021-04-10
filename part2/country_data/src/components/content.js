import React from 'react'
import Country from './country'

const Content = ({countries}) => {
    switch (true) {
        case countries.length === 250:
            return (
                <div/>
            )
        case countries.length > 10:
            return (
                <div>Too many matches, refine Search</div>
            )
        case countries.length === 1:
            return (
                <Country country={countries[0]}/>
            )
        default:
            return (
                <div>
                    {countries.map(country => (
                        <div key={country.name}> {country.name} </div>
                    ))}
                </div>
            )
    }





    // if (countries.legnth > 10 ) {
    //     return (
    //         <div>
    //         Too many matches, refine search
    //         </div>
    //     )
    // }
    // else if (countries.length === 0) {
    //     return (
    //         <div> </div>
    //     )
    // }
    // else if (countries.length === 1) {
    //     console.log(countries);
    //     return (
    //         <Country country={countries}/>
    //     )
    // }
    // else {
    //     return (
    //         <div>
    //             {countries.map(country => (
    //                 <div key={country.name}> {country.name} </div>
    //             ))}
    //         </div>
    //     )
    // }
}


export default Content

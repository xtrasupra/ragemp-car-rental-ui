import React, { Component } from "react";
import CarDetails from "./components/CarDetails.jsx";

// CSS
import './css/style.css'
import './css/font.css'


//SVG
import CarLogo from './svg/CarLogo.svg'
import ExitStick from './svg/ExitStick.svg'
import BgLogo from './svg/BgLogo.svg'

//PNG
import cruiser from './images/cruiser.png';
import bmx from './images/bmx.png';
import Scorcher from './images/scorcher.png';

import pegassi_faggio_mod from './images/pegassi_faggio_mod.png'
import pegassi_faggio from './images/pegassi_faggio.png'
import pegassi_faggio_sport from './images/pegassi_faggio_sport.png'


import western_bagger from './images/western_bagger.png'
import dinka_enduro from './images/dinka_enduro.png'
import nagasaki_stryder from './images/nagasaki_stryder.png'

import EventManager from './EventManager.js';

class CarRent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            selectedCar: null,
            selectedBlock: null,
            animationKey: 0,
            cars: [
                { price: 444, name: "BMX", sale: 13, type: "Велосипеды", image: bmx, conf1: "32", conf2: "1", conf3: "Мускульная"},
                { price: 200, name: "Cruiser", sale: -1, type: "Велосипеды", image: cruiser, conf1: "34", conf2: "1", conf3: "Мускульная"},
                { price: 200, name: "Scorcher", sale: 60, type: "Велосипеды", image: Scorcher, conf1: "42", conf2: "1", conf3: "Мускульная"},
                { price: 444, name: "Faggio3", sale: 0, type: "Мотоциклы", image: pegassi_faggio_mod, conf1: "34", conf2: "2", conf3: "Бензин"},
                { price: 200, name: "Faggio2", sale: 0, type: "Мотоциклы", image: pegassi_faggio_sport, conf1: "37", conf2: "2", conf3: "Бензин"},
                { price: 444, name: "Faggio", sale: 0, type: "Мотоциклы", image: pegassi_faggio, conf1: "50", conf2: "2", conf3: "Бензин"},
                { price: 444, name: "Enduro", type: "Мотоциклы", image: dinka_enduro, conf1: "80", conf2: "2", conf3: "Бензин"},
                { price: 200, name: "Bagger", sale: 13, type: "Мотоциклы", image: western_bagger, conf1: "90", conf2: "2", conf3: "Бензин"},
                { price: 444, name: "Stryder", sale: 0, type: "Мотоциклы", image: nagasaki_stryder, conf1: "124", conf2: "2", conf3: "Бензин"},
            ]
        };
    }

    componentDidMount() {
        EventManager.addHandler('carrent', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateItems') {
                try {
                    const updatedItems = value.items.map((item) => {
                        const original = this.state.cars.find(car => car.name === item.name);
                        return original ? { ...original, ...item } : item;
                    });
                    this.setState({ show: true, cars: updatedItems });
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('carrent');
    }

    setHide = () => {
        this.setState({
            show: false,
            selectedCar: null,
            selectedBlock: null
        })

        try {
            mp.trigger('client:carRent:hide'); // eslint-disable-line
        } catch (e) {
            console.log(e);
        }
    }

    resetSelected = () => {
        this.setState({
            selectedCar: null,
            selectedBlock: null
        })
    }

    handleSelect = (block) => {
        this.setState((prevState) => ({
            selectedCar: { ...block, params: block.params || { name: block.name, price: block.price } },
            selectedBlock: block,
            animationKey: prevState.animationKey + 1
        }));
    };

    render() {
        if (!this.state.show) {return null};

        return (
            <div className='bg--general--1'>
                <img alt='' src={BgLogo} className='bg--logo--invisible'/>
                <img alt='' src={CarLogo} className='logo--rent--2'/>
                <h className='rent--car--text--8'>RentSL</h>
                <h className='rent--car--text--9'>Аренда авто</h>
                <img alt='' src={ExitStick} className='exit--stick--3'/>
                <button className='close--rent--4' onClick={this.setHide}>Закрыть</button>
                <div className={`grid--container--block--5 ${this.state.selectedBlock ? 'gap--select--grid--16' : ''}`}>
                    {this.state.cars.map((block, index) => (
                        <div className='general--block--6' key={index} onClick={() => this.handleSelect(block)}>
                            {/* Replace */}
                            <img
                                alt=''
                                src={block.image}
                                className="general--image--block--7"
                            />
                            <div className='general--cap--block--10'>
                                <h className="car--brand--text--11">{block.name}</h>
                                <h className="car--brand--text--12">{block.type}</h>
                                <button
                                    className='select--car--rent--13'
                                    onClick={() => this.handleSelect(block)}>
                                    {block.price}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div key={this.state.animationKey} className='select--general--rent--14'>
                    {this.state.selectedCar && (
                        <CarDetails
                            car={this.state.selectedCar}
                            params={this.state.selectedCar.params}
                            name={this.state.selectedCar.name}    
                            price={this.state.selectedCar.price}    
                            type={this.state.selectedCar.type}      
                            sale={this.state.selectedCar.sale}
                            image={this.state.selectedCar.image}
                            conf1={this.state.selectedCar.conf1}
                            conf2={this.state.selectedCar.conf2}
                            conf3={this.state.selectedCar.conf3}
                            onRentComplete={this.resetSelected}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default CarRent;

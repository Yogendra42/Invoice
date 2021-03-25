import React, { useState } from 'react';
import { Col, Input, Label, Row, Table, Button } from 'reactstrap';
import deleteIcon from "../delete.png";
const tableheader = ['#', 'Name', 'Rate', 'Quantity', 'Basic Cost', 'Discount(%)', 'Discount Amt', 'Final Basic Cost', 'Taxes(%)', 'Tax Amt.', 'Total Cost', 'Tools'];
const Invoice = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [items, setItems] = useState(
        [{
            Name:'',Rate:'',Quantity:'',BasicCost:'',Discount:'',
            DiscountAmt:'',FinalBasicCost:'',Taxes:'',TaxAmt:'',TotalCost:'',
        }]
    );
    const [total, setTotal] = useState({totolBasicCost:0,totalDiscount:0,totalFinalBasicCost:0,totalTax:0,finalPrice:0});

    // input values and calc
    const handleChange = (e,id,field) => {
        const CurrItems = items;
        const selectedItem = CurrItems[id];
        selectedItem[field] = e.target.value;
        selectedItem.BasicCost = selectedItem.Rate * selectedItem.Quantity;
        selectedItem.DiscountAmt = (selectedItem.Discount * selectedItem.BasicCost)/100; 
        selectedItem.FinalBasicCost = selectedItem.BasicCost - selectedItem.DiscountAmt;
        selectedItem.TaxAmt = (selectedItem.Taxes * selectedItem.FinalBasicCost)/100;
        selectedItem.TotalCost = selectedItem.FinalBasicCost + selectedItem.TaxAmt;
        setItems([...CurrItems]);
        calcTotal(CurrItems);
    }

    // calculate final values
    const calcTotal = (items) => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const final = {totolBasicCost:0,totalDiscount:0,totalFinalBasicCost:0,totalTax:0,finalPrice:0};
        final.totolBasicCost = items.map(item => item.BasicCost).reduce(reducer,0);
        final.totalDiscount = items.map(item => item.DiscountAmt).reduce(reducer,0);
        final.totalFinalBasicCost = items.map(item => item.FinalBasicCost).reduce(reducer,0);
        final.totalTax = items.map(item => item.TaxAmt).reduce(reducer,0);
        final.finalPrice = items.map(item => item.TotalCost).reduce(reducer,0);
        setTotal({...final});
    }

    // add item
    const addItem = () => {
        setItems([...items,{
            Name:'',Rate:'',Quantity:'',BasicCost:'',Discount:'',
            DiscountAmt:'',FinalBasicCost:'',Taxes:'',TaxAmt:'',TotalCost:'',
        }])
    }

    // delte item
    const deleteItem = (id) => {
        const final = items.filter((item, index) => index != id)
        setItems([...final]);
        calcTotal(final);
    }

    const deleteAll = () => {
        const final = [{
            Name:'',Rate:'',Quantity:'',BasicCost:'',Discount:'',
            DiscountAmt:'',FinalBasicCost:'',Taxes:'',TaxAmt:'',TotalCost:'',
        }];
        setItems([...final]);
        calcTotal(final);
    }

    // validate and save invoice at database 
    const save = () => {
        if(!name){
            alert('Name field is empty');
            return;
        }
        if(!email){
            alert('Email field is empty')
            return;
        }
        if(!phone){
            alert('Phone field is empty');
        }
        const final = [];
        items.forEach((item, index) => {
            if( item.Name && item.Rate && item.Quantity && item.Discount || item.Taxes ){
                final.push(item)
        }})
        console.log([...final]);
        
    }

    return(
        <>
        <Row className="align-items-end mb-4">
            <Col xs="2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
            </Col>
            <Col xs="2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            </Col>
            <Col xs="2">
                <Label>Phone</Label>
                <Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button color="primary" onClick={() => deleteAll() }>
                    Delete All
                </Button>
                <Button color="primary" onClick={() => addItem() }>
                    Add New Item
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Label className="textstyle">
                    Item Details
                </Label>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            {tableheader.map((heading, index) => <th key={index} style={{backgroundColor:'#007bff', color:'white'}}>{heading}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Input value={item.Name} onChange={(e) => handleChange(e,index,'Name')}></Input></td>
                                <td><Input type="number" value={item.Rate} onChange={(e) => handleChange(e,index,'Rate')}></Input></td>
                                <td><Input type="number" value={item.Quantity} onChange={(e) => handleChange(e,index,'Quantity')}></Input></td>
                                <td><Input type="number" value={item.BasicCost} readOnly></Input></td>
                                <td><Input type="number" value={item.Discount}onChange={(e) => handleChange(e,index,'Discount')} ></Input></td>
                                <td><Input type="number" value={item.DiscountAmt} readOnly></Input></td>
                                <td><Input type="number" value={item.FinalBasicCost} readOnly></Input></td>
                                <td><Input type="number" value={item.Taxes} onChange={(e) => handleChange(e,index,'Taxes')}></Input></td>
                                <td><Input type="number" value={item.TaxAmt} readOnly></Input></td>
                                <td><Input type="number" value={item.TotalCost} readOnly></Input></td>
                                <td><img src={deleteIcon} alt="delete" onClick={() => deleteItem(index)} /></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex pr-5 textstyle">
                <span className="minWidth200">Total Basic Cost</span><span className="px-3">:</span><span>{total.totolBasicCost}</span> 
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex pr-5 textstyle">
                <span className="minWidth200">Total Discount</span><span className="px-3">:</span><span>{total.totalDiscount}</span>
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex pr-5 textstyle">
                <span className="minWidth200">Total Final Basic Cost</span><span className="px-3">:</span><span>{total.totalFinalBasicCost}</span> 
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex pr-5 textstyle">
                <span className="minWidth200">Total Tax</span><span className="px-3">:</span><span>{parseFloat(total.totalTax).toFixed(2)}</span>
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex pr-5 textstyle">
                <span className="minWidth200">Final Price</span><span className="px-3">:</span><span>{parseFloat(total.finalPrice).toFixed(2)}</span> 
            </Col>
        </Row>
        <Row>
            <Col className="col-4 offset-8 d-flex">
                <Button className="px-4" onClick={() => save()}>Save</Button>
            </Col>
        </Row>
        </>
    )
}

export default Invoice;
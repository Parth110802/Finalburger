import React, { Component } from 'react';
import * as action from '../../store/action/index'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    componentDidMount() {
      this.props.onFetchOrders(this.props.token , this.props.userId)
    }

    render () {
        let orders = <Spinner/>
        if(!this.props.loading){
            orders=   this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
              {orders}
            </div>
        );
    }
}

const mapStateToprops = state =>{
    return{
        orders : state.order.orders,
        loading : state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoprops = dispatch =>{
    return{
        onFetchOrders: (token , userId)=> dispatch(action.fetchOrders(token , userId))
    }
}

export default connect(mapStateToprops , mapDispatchtoprops) (withErrorHandler(Orders, axios));
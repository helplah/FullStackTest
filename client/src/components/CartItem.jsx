import React, { Component } from 'react';
import minus from '../assets/minus.svg';
import plus from '../assets/plus.svg';
import PropTypes from 'prop-types';

class CartItem extends Component {
  removeProduct = () => {
    this.props.removeProduct(this.props.id);
  };

  handleEvent = event => {
    const { id, qty, updateCart } = this.props;

    if (qty === 0) {
      this.removeProduct();
    } else if (!event.target.value) {
      updateCart(event.currentTarget.dataset.event, id);
    } else {
      updateCart(event.target.value, id);
    }
  };

  render() {
    const { id, qty, product } = this.props;
    const price = product.price.toLocaleString('en-US', {
      minimumFractionDigits: 2
    });

    // if a product was clicked return a row of product, else return null
    if (id.length !== 0 && qty > 0) {
      return (
        <div className="shoplah-items">
          <div className="shoplah-product">
            <i
              className="far fa-window-close shoplah-cancel"
              onClick={this.removeProduct}
            />
            <div className="product-details">
              <img
                className="shoplah-img"
                src={product.image}
                alt={product.name}
              />
              <span>{product.name}</span>
            </div>
          </div>
          <span>{'$' + price}</span>
          <div className="shoplah-qty">
            <button
              data-event="minus"
              className="shoplah-btn-outline"
              onClick={e => this.handleEvent(e)}
            >
              <img src={minus} alt="Minus sign" />
            </button>
            <input
              data-event={qty}
              className="shoplah-btn-outline shoplah-input"
              onChange={e => this.handleEvent(e)}
              value={qty}
              name="quantity"
              type="text"
            />
            <button
              data-event="plus"
              className="shoplah-btn-outline"
              onClick={e => this.handleEvent(e)}
            >
              <img src={plus} alt="Plus sign" />
            </button>
          </div>
          <span>
            {'$' +
              (qty * product.price).toLocaleString('en-US', {
                minimumFractionDigits: 2
              })}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  removeProduct: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired
};

export default CartItem;

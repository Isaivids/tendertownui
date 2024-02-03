import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import './ProductCard.scss';
const ProductCard = ({ data }: any) => {
  return (
    <div className="productCard">
      {data.length > 0 &&
        data.map((x: any) => {
          return (
            <div className="p-col-12 p-md-4 single">
              <Card
                title={x.name}
                subTitle={`$${x.amount}`}
                style={{ marginBottom: "2em" }}
                header={
                  <img alt={x.name} src={x.photo} className="p-card-image" />
                }
              >
                <div>{x.description}</div>
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
                <Badge
                  value="10"
                  className="p-badge-secondary"
                  style={{ marginLeft: "0.5em" }}
                />
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCard;

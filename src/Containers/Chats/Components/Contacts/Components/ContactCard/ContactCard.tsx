import React from "react";
import { FaTrash } from "react-icons/fa";
const ContactCard = () => {
  return (
    <div className="col-xs-12 cursor-pointer hover:bg-secondary transition-all">
      <div className="row">
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-12 text-lg font-bold">Dohn Joe</div>
            <div className="col-xs-12">Hey! how you doin?</div>
          </div>
        </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-12 flex justify-center mt-2">
              <FaTrash className="text-warning cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary w-full my-2 h-1 opacity-30" />
    </div>
  );
};

export default ContactCard;

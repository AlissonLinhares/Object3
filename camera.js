/*---------------------------------------------------------------------------*
 * Copyright (C) 2014 Alisson L. Carvalho, Alandesson L. Carvalho.           *
 * All rights reserved.                                                      *
 *                                                                           *
 * This file is part of the Oxygen lib.                                      *
 *                                                                           *
 * The Oxygen lib is free software: you can redistribute it and/or           *
 * modify it under the terms of the GNU Lesser General Public License as     *
 * published by the Free Software Foundation, either version 3 of the        *
 * License, or (at your option) any later version.                           *
 *                                                                           *
 * The Oxygen lib is distributed in the hope that it will be useful,         *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of            *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the              *
 * GNU Lesser General Public License for more details.                       *
 *                                                                           *
 * You should have received a copy of the GNU Lesser General Public License  *
 * along with the Oxygen lib. If not, see <http://www.gnu.org/licenses/>.    *
 *---------------------------------------------------------------------------*/

var Camera = function( x, y, z ) {
	Object3D.call( this, x, y, z );
	Oxygen.addCamera( this );
}

Camera.prototype = Object.create( Object3D.prototype );

Camera.prototype._fildOfView   = 45;
Camera.prototype._nearClip     = 0.1;
Camera.prototype._farClip      = 100.0;
Camera.prototype._aspectRation = 4/3;

// Overrider método
Camera.prototype.reset = function() {
	mat4.perspective( this._fildOfView, this._aspectRation, this._nearClip, this._farClip, this._transform );
}

Camera.prototype.setFildOfView = function( fildOfView ) {
	this._fildOfView = fildOfView;
}

Camera.prototype.setNearClip = function( nearClip ) {
	this._nearClip = nearClip;
}

Camera.prototype.setFarClip = function( farClip ) {
	this._farClip = farClip;
}

Camera.prototype.setAspectRation = function( aspectRation ) {
	this._aspectRation = aspectRation;
}

Camera.prototype.setPosition = function( x, y, z ) {
	this._transform[12] = x;
	this._transform[13] = y;
	this.setZ( z );
}

Camera.prototype.setZ = function( z ) {
	this._transform[14] = -( this._farClip * this._nearClip * 2 ) / ( this._farClip - this._nearClip );
	this._transform[14] += this._transform[10] * z;
	this._transform[15] = this._transform[11] * z;
}

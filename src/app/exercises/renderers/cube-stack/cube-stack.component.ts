import { Component, AfterViewInit } from '@angular/core';
import { BaseThreeRendererComponent } from '../base-three-renderer.component';

import * as CANNON from 'cannon';
import * as THREE from 'three';

@Component({
  selector: 'app-cube-stack',
  templateUrl: '../base-three-renderer.component.html',
  styleUrls: ['./cube-stack.component.scss'],
})
export class CubeStackComponent extends BaseThreeRendererComponent implements AfterViewInit {

  physicsEnabled = true;

  // backgroundMaterial = new THREE.MeshStandardMaterial( {
  //   color: 0x000000
  // });

  guiParams = {
    addCube: () => this.addCube(new THREE.Vector3(Math.random() * 50, Math.random() * 50, Math.random() * 50 ) )
  };

  private cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000
  });

  ngAfterViewInit() {
    super.ngAfterViewInit();

    //Dat.GUI tweaks
    this.gui.add(this.guiParams, 'addCube');

    this.setUpEnvironment();

    // setTimeout(  () => this.addCube(new THREE.Vector3(0, 0, 0)), 1500);
    // setTimeout(  () => this.addCube(new THREE.Vector3(0, 1, 0)), 2500);


    this.animate();
  }


  public animate() {



    super.animate();
  }

  private setUpEnvironment() {

    const backgroundMaterial = new THREE.MeshStandardMaterial();

    // Floor Plane
    // Cannon.js Plane
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body();
    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    this.world.addBody(floorBody);

    // Three.js Plane
    const floorGeometry = new THREE.PlaneGeometry( 50, 50);
    const floorMesh = new THREE.Mesh( floorGeometry, backgroundMaterial);
    floorMesh.rotation.x = - Math.PI / 2;
    this.scene.add(floorMesh);
  }


  private addCube(
    surfacePosition: THREE.Vector3 = new THREE.Vector3(),
    surfaceTilt: THREE.Vector3 = new THREE.Vector3()
  ): void {
    const tempRandomRating = Math.random();
    const ratingColour = this.ratingFeedback.getRatingColour(tempRandomRating);

    //Create Three.js cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMesh = new THREE.Mesh(cubeGeometry, this.cubeMaterial.clone());
    cubeMesh.material.color = new THREE.Color(ratingColour);
    cubeMesh.position.y = surfacePosition.y + .5;
    cubeMesh.rotation.y = Math.random() * Math.PI * 2;
    this.scene.add(cubeMesh);

    this.ratingFeedback.playRatingSound( tempRandomRating );

    //Create Cannon.js cube
  }
}

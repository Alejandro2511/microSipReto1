import React, {useState} from 'react'
/*import { ReactDOM } from 'react'*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
/*import 'bootstrap/dist/css/bootstrap.min'*/

import Head from 'next/head'
import Link from 'next/Link'
import {useRouter} from 'next/router'
import AppLayout from '../components/AppLayout'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter}  from 'reactstrap'

export default function Home() {
  const router = useRouter()

  const dataArticulos = [
    {id: 1, nombre: 'Guantes de Box', costo: 400},
    {id: 2, nombre: 'Gogles para nadar', costo: 350},
    {id: 3, nombre: 'Balon de futbol#5', costo: 300},
    {id: 4, nombre: 'Tennis Adidas #6', costo: 250},
    {id: 5, nombre: 'Gorra Nike ', costo: 200},
    {id: 6, nombre: 'Botella hidratante', costo: 150},
    {id: 7, nombre: 'Pans Deportivo', costo: 50},
  ]; 
  
const [data, setData] = useState(dataArticulos);
const [modalEditar, setModalEditar] = useState(false);
const [modalEliminar, setModalEliminar] = useState(false)
const [modalInsertar, setModalInsertar] = useState(false)

const [articuloSeleccionado, setArticuloSeleccionado] = useState({
  id: '',
  nombre: '',
  costo: '',
  iva:'',
  precio: ''
});

const seleccionarArticulo = (elemento, caso) =>  {
   setArticuloSeleccionado (elemento);
    (caso === 'Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setArticuloSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
    /*console.log(articuloSeleccionado);*/
  }


  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(articulo => {
      if(articulo.id===articuloSeleccionado.id){
        articulo.costo=articuloSeleccionado.costo;
        articulo.nombre=articuloSeleccionado.nombre;
        articulo.iva=articuloSeleccionado.costo*.16;
        articulo.precio=articuloSeleccionado.costo+iva;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(articulo=>articulo.id!==articuloSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setArticuloSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=articuloSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }
 
  const iva = () =>{
    var ivaArticulo;
    iva= 0.16;
    ivaArticulo= costo*0.16;
  }

  
  const precio=() =>{
    var precioTotal, precioAplicado;
    costo= costo+iva;
    
  }

  return (
    <>


      <Head>
        <title>MicroSip</title>
        <link rel="icon"  href="../../img/Isotipo.ico" />
      </Head>

    <AppLayout>
      <div className="header">
      <h1 >
        <a className="titulo" href="https://www.microsip.com/">MicroSip</a>
        </h1>
      </div>
    </AppLayout>

      
    
     <main className="container">  
     
         <div>
           <h2>Articulos</h2>
           <Button className="insert" color="primary" onClick={()=>abrirModalInsertar()}>+</Button>
               

             
           <table className="table table-bordered">
         <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Acciones</th>
             

            </tr>
         </thead>
           <tbody>
             {data.map(elemento=>(
               <tr>
                   <td>{elemento.id}</td>
                   <td>{elemento.nombre}</td>
                    
                   <td>
                     
                     <Button  className="btn btn-primary"  onClick={()=>seleccionarArticulo(elemento, 'Editar')}>Editar </Button> {"  "}
                       
                    <Button className="btn btn-danger"  onClick={() =>seleccionarArticulo(elemento, 'Eliminar')}>eliminar</Button>
                       
                    </td>
               </tr>
             ))
             }
           </tbody>
       </table>
       


       <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Articulo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={articuloSeleccionado && articuloSeleccionado.id}
           
           />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={articuloSeleccionado && articuloSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Costo</label>
            <input
              className="form-control"
              type="number"
              name="costo"
              value={articuloSeleccionado && articuloSeleccionado.costo}
              onChange={handleChange}
            />
            <br />


            <label>IVA</label>
            <input
              className="form-control"
              readOnly
              type="number"
              name="iva"
              value={articuloSeleccionado && articuloSeleccionado.iva}
             /* value={articuloSeleccionado && articuloSeleccionado.nombre}
              */onChange={handleChange}
            />
            <br />



            <label>Precio</label>
            <input
              className="form-control"
              readOnly
              type="number"
              name="precio"
              value={articuloSeleccionado ? articuloSeleccionado.precio:' '}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>


        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar  {articuloSeleccionado && articuloSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
       
       


      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Crear Articulo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
           

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={articuloSeleccionado ? articuloSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Costo</label>
            <input
              className="form-control"
              type="text"
              name="costo"
              value={articuloSeleccionado ? articuloSeleccionado.costo: ''}
              onChange={handleChange}
            />
            <br />


            <label>IVA</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="iva"
              value={articuloSeleccionado && articuloSeleccionado.iva}
              /*value={articuloSeleccionado ? articuloSeleccionado.nombre: ''}
              */onChange={handleChange}
            />
            <br />


            <label>Precio</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="precio"
              value={articuloSeleccionado ? articuloSeleccionado.precio: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

         </div>
          
   
          </main>

         

    </>
  )
}

import Image from '../models/imagen';


export default{
    render( Image: Image ){
      return {
    id: Image.id,
    url:`http://localhost:3333/uploads/${Image.path}`
      };
    },

    renderMany( Image: Image[]) {
        return Image.map(Image => this.render(Image))
    }


};
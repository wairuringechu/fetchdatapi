import axios from 'axios';
{id:1,
axios.get('https://example.com/products')
  .then(response => {
    const products1= response.data;
    console.log(products1);
  })
  .catch(error => {
    console.error(error);
  });
}

{id:2,
    axios.get('https://exapmle.com//products/smartphones')
    .then(response => {
        const products2= response.data;
        console.log(products2);
    })
    .catch(error =>{
        console.log(error);
    });

    }





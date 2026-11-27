export type City = {slug:string;name:string;state:string;pin:string};
// Reference locality PINs, not verified courier coverage or business addresses.
export const cities:City[] = [
  {
    "slug": "gurgaon",
    "name": "Gurgaon (Gurugram)",
    "state": "Haryana",
    "pin": "122001"
  },
  {
    "slug": "new-delhi",
    "name": "New Delhi",
    "state": "Delhi",
    "pin": "110001"
  },
  {
    "slug": "noida",
    "name": "Noida",
    "state": "Uttar Pradesh",
    "pin": "201301"
  },
  {
    "slug": "ghaziabad",
    "name": "Ghaziabad",
    "state": "Uttar Pradesh",
    "pin": "201001"
  },
  {
    "slug": "faridabad",
    "name": "Faridabad",
    "state": "Haryana",
    "pin": "121002"
  },
  {
    "slug": "jaipur",
    "name": "Jaipur",
    "state": "Rajasthan",
    "pin": "302001"
  },
  {
    "slug": "lucknow",
    "name": "Lucknow",
    "state": "Uttar Pradesh",
    "pin": "226001"
  },
  {
    "slug": "kanpur",
    "name": "Kanpur",
    "state": "Uttar Pradesh",
    "pin": "208001"
  },
  {
    "slug": "ahmedabad",
    "name": "Ahmedabad",
    "state": "Gujarat",
    "pin": "380001"
  },
  {
    "slug": "surat",
    "name": "Surat",
    "state": "Gujarat",
    "pin": "395003"
  },
  {
    "slug": "mumbai",
    "name": "Mumbai",
    "state": "Maharashtra",
    "pin": "400001"
  },
  {
    "slug": "pune",
    "name": "Pune",
    "state": "Maharashtra",
    "pin": "411001"
  },
  {
    "slug": "indore",
    "name": "Indore",
    "state": "Madhya Pradesh",
    "pin": "452001"
  },
  {
    "slug": "bhopal",
    "name": "Bhopal",
    "state": "Madhya Pradesh",
    "pin": "462001"
  },
  {
    "slug": "hyderabad",
    "name": "Hyderabad",
    "state": "Telangana",
    "pin": "500001"
  },
  {
    "slug": "bengaluru",
    "name": "Bengaluru",
    "state": "Karnataka",
    "pin": "560001"
  },
  {
    "slug": "chennai",
    "name": "Chennai",
    "state": "Tamil Nadu",
    "pin": "600001"
  },
  {
    "slug": "kolkata",
    "name": "Kolkata",
    "state": "West Bengal",
    "pin": "700001"
  },
  {
    "slug": "chandigarh",
    "name": "Chandigarh",
    "state": "Chandigarh",
    "pin": "160017"
  },
  {
    "slug": "ludhiana",
    "name": "Ludhiana",
    "state": "Punjab",
    "pin": "141001"
  }
];
export const getCity=(slug:string)=>cities.find(c=>c.slug===slug);
export const cityPath=(city:City,product?:string)=>'/india/'+city.slug+(product?'/'+product:'');
export const pinMap=(city:City)=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(city.name+' '+city.state+' '+city.pin+' India');
export const quotePath=(city:City,product?:string)=>'/bulk-supply?'+new URLSearchParams({city:city.slug,...(product?{product}: {})}).toString();

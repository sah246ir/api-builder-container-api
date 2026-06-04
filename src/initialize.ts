const InitializeApi = async()=>{
    try{
        // TODO: add logs throughout the functions
    
        // ENV
        let userId:number = parseInt(process.env.USERID || "")
        let apiId:number = parseInt(process.env.APIID || "")
    
        // TODO: find the api schema from the mongodb cluster
        let Schema:any
        
        // TODO:fetch code snippets/dependencies from s3 and populate fs


        // TODO: segregate schema into routeDefinitions and middlewareDefinition

    } catch(e){
        console.log(e)
    } 
}

const { text } = require("express");
const mysql =require("mysql");//import mysql
var nodemailer = require('nodemailer');
//const jwt=require("jsonwebtoken");
//const bcrypt=require("bcryptjs");

const db=mysql.createConnection(
    {
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE
    });

exports.register = (req, res) =>
 {
    console.log(req.body);//grabing  all data from the form
    //fatching info
    // const chapitre=req.body.chapitre;
    
    const nom =req.body.article;
    const matiere=req.body.matiere;
    const idsouschapitre=req.body.souschapitre;
    db.query('select * from article where nom=?',[nom],async(error,results)=>
    {   
        console.log('***');
        console.log(results);
        console.log(matiere);
        if(error)
        {
        console.log(error);
        }
        if(results.nom)
        {
        return res.render('add-article',{ message:"article kyn"});
        }
    });
            console.log("you did it once",idsouschapitre);
            var today = new Date();
            db.query("INSERT INTO article(id_article,nom,montant,credit,debit,date,id_sous_ch) VALUES (?,?,?,?,?,?,?)",['',nom,0,0,0,today,idsouschapitre],(error,results)=>{
                if (error) throw error;
                else if (results){
                  db.query('select * from article where nom=?',[nom],async(error,results)=>
                  { 
                    if (error) throw error;
                    else if (results){
                      let idarticle= results[0].id_article;
                      idarticle = Number(idarticle) ;
                      db.query("INSERT INTO matiere (id_matiere, matiere, id_article) VALUES (?,?,?)",['',matiere,idarticle],(error,results)=>{
                        if (error) throw error;});
                        return res.render('add-article',{ message:"ook article rah tsjl"});

                    }});
              
            }});
    }
exports.trans=(req, res) =>
{ 
  console.log(req.body); //fatching info
    const idchapitre1=req.body.chapitre;
    const idchapitre2=req.body.chapitre2;
    const montant=req.body.montant;
    if(montant<=0)
    { 
      return res.render('trans',{ message:"Le montant ne peut pas être négatif"});
     
    }
    db.query('select solde from chapitre where idchapitre=?',[idchapitre1],async(error,results)=>
    {   
      if (montant>results[0].solde)
      { 
        return res.render('trans',{ message:"Le chapitre ne contient pas assez d argent"});
      }
      console.log(results[0].solde);
      if(error){console.log(error);}
      if(results)
      {
        var sol = results[0].solde;
        var solde1 = Number(sol) - Number(montant);
        console.log(sol);
        console.log(montant);
        console.log(solde1);
        db.query('UPDATE chapitre SET solde = ? WHERE idchapitre=?',[solde1,idchapitre1],async(error,results)=>
        {   
          if(error){throw error; }
          else 
          {
            console.log(results);
          }});
        db.query('select solde from chapitre where idchapitre=?',[idchapitre2],async(error,results)=>
        {   
        console.log(results);
        if(error){console.log(error); }
        if(results)
        { 
        var sol2= results[0].solde;
        var solde2 = Number(sol2) + Number(montant);
        console.log(sol2);
        console.log(montant);
        console.log(solde2);
        db.query('UPDATE chapitre SET solde = ? WHERE idchapitre=?',[solde2,idchapitre2],async(error,results)=>
        {   
        if(error){ throw error; }
        else 
        { console.log(results);}});
        }
       });
        }
       });
}
exports.email=(req, res) =>
      {
        console.log(req.body);//grabing  all data from the form
        //fatching info
       const from=req.body.from;
       const to=req.body.to;
       const objet=req.body.objet;
       const message =req.body.message;
      
       var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        auth: {
          user: 'abirbenaissa123@gmail.com',
          pass: 'anabiba1999'
        }
      });
      
      var mailOptions = {
        from: from ,
        to: to ,
        subject: objet,
        text: message 
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    }


exports.billan=(req, res) =>
    {
   let total1= [];
  
    db.query('select * from operation',async(error,results)=>
    {
      len=results.length;
      for (i=0 ;i<len;i++ ) { 
      if(error){console.log(error);}
      if(results)
      {   
        let montant=results[i].montant;
        let discription=results[i].discription;
        let id_employe=results[i].id_employe;
        let date=results[i].date;
        let id_operation =results[i].id_operation;
               let id = results[i].id_employe;
        db.query('SELECT * FROM employe WHERE id_employe=?',[id],async(error,results)=>
        {   
          if(error){throw error; }
          else
          {
            let nom=results[0].nom;
            let  prenom=results[0].prenom;
            total1.push ({id_operation:id_operation,montant:montant, discription:discription,id_employe:id_employe ,date:date ,nom:nom,prenom:prenom});
            if(total1.length==len) {
              res.render('billan', {total1} );
            }}});
         } }
          }); 
        
       
       
 }

 exports.billan_mois=(req, res) =>
      {
        console.log(req.body);
       
       const date =req.body.date;
        
        let total1= [];
  
        db.query('select * from operation WHERE date=?',[date],async(error,results)=>
        {
          len=results.length;
          for (i=0 ;i<len;i++ ) { 
          if(error){console.log(error);}
          if(results)
          {   
            let montant=results[i].montant;
            let discription=results[i].discription;
            let id_employe=results[i].id_employe;
            let date=results[i].date;
            let id_operation =results[i].id_operation;
                   let id = results[i].id_employe;
            db.query('SELECT * FROM employe WHERE id_employe=?',[id],async(error,results)=>
            {   
              if(error){throw error; }
              else
              {
                let nom=results[0].nom;
                let  prenom=results[0].prenom;
                total1.push ({id_operation:id_operation,montant:montant, discription:discription,id_employe:id_employe ,date:date ,nom:nom,prenom:prenom});
                if(total1.length==len) {
                  res.render('billan', {total1} );
                }}});
             } }
              }); 
            
           
           
      }
exports.registerinarti =(req,res)=>{
        console.log(req.body);//grabbing all data send fromm the form 
       
        const name = req.body.name;
        const email= req.body.email;
        const image = req.body.image;
        const info = req.body.info;
    
        //quering database
        db.query('SELECT email FROM demande WHERE email= ?',[email],async(error,results)=>
        {
            if(error)
            {
                console.log(error);
            
            }
            if(results.length>0)
            {
                return res.render("register",{
                    message :'vous avez déja inscrit !'
                })
            }
        
       
        db.query('INSERT INTO demande SET ?',{name:name,email:email,image:image,info:info},(error,results)=>{
            if(error)
            {
                console.log(error);
            
            }
            else
            {
                return res.render("register",{
                    message :'inscription réussite !'
                })
            
            }
    
        })
    
    
        });
       
    }
    exports.partagermontant =(req,res)=>{ 
    
     //fatching info
    let montant=Number(req.body.montant);
    let idchapitre = Number(req.body.chapitre);

  db.query('select * from compte where id_compte=1',async(error,results)=>

    { 
      if(error){console.log(error);} 
      
      let solde01 = results[0].solde;
      let debit= results[0].debit_compte ;
      let soldecompt = solde01-montant;
      let debit_compte = debit + montant ;
      
       if (Number(soldecompt )< Number(montant))
      { 
        return res.render('partagermontant',{ message:"Insuffisant"});
      }
      else {
        db.query('UPDATE compte SET solde=?  ',[soldecompt],async(error,results)=>
        {
          if(error){console.log(error);} 
         else 
         {
         } });
         db.query('UPDATE compte SET debit_compte=? ',[debit_compte],async(error,results)=>
        {
          if(error){console.log(error);} 
         else 
         {
         } }); 
         console.log(Number(idchapitre));
       db.query('select * from chapitre where idchapitre =?',[Number(idchapitre)],async(error,results)=>

        {
          
          if(error){console.log(error);} 
          
          if (results)
          {
            let soldechapitre  = Number(results[0].solde)+montant;
            let creditchapitre = Number(results[0].credit)+montant;
            
            db.query('UPDATE chapitre SET credit=? WHERE idchapitre=?',[creditchapitre,idchapitre],async(error,results)=>
            {
              if(error){console.log(error);} 
              if (results)
          { 
            
              
          }});

          db.query('UPDATE chapitre SET solde= ? WHERE idchapitre=?',[soldechapitre,idchapitre],async(error,results)=>
          {
            if(error){console.log(error);} 
            if (results)
        { 
          console.log(soldecompt);
          return res.render('partagermontant',{ msg:"did", soldecompt:soldecompt});
            
        }});

             


          } 
          
      });
        }
      
      });
    }
exports.register1 =(req,res)=>{
      console.log(req.body);//grabbing all data send fromm the form 
     
     
      const email= req.body.email;
      const password =req.body.password;
      //quering database
      db.query('SELECT email FROM employe WHERE email= ? AND password= ? ',[email,password],async(error,results)=>
      {
          
          if(error)
          {
              console.log(error);
          
          }
          if(results.length>0)
          {
              return res.render("indexuser",{
                  message :'welcome'
              })
          }
          if(results.length<0)
          {
              return res.render("register",{
                  message :'Email ou mot de passe incorect'
              })  
          }
          else
          {db.query('SELECT email FROM admin WHERE email= ? AND password= ? ',[email,password],async(error,results)=>
          {
              
              if(error)
              {
                  console.log(error);
              
              }
              if(results.length>0)
              {
                  return res.render("indexadmin",{
                      message :'welcome'
                  })
              }
              else
              {
                  return res.render("register",{
                      message :'Email ou mot de passe incorect'
                  })  
              }
              
          });
          
  
  
          }
      });
      
  }
  
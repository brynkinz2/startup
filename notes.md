# CS 260 Notes

[My startup](https://startup.chorechum.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown Documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## AWS Notes

#### AWS Startup
Command to remote shell into the server:   ssh -i [key pair file] ubuntu@[ip address]  
Elastic IP address:  98.84.128.125  
To open website:  http://98.84.128.125  
#### Route 52
Website with domain: [http://chorechum.click](http://chorechum.click)  
Adding a record with the record name "*" is a wildcard, meaning that you can reach your domain with any subdomain added on. For example "http://chorechum.click" works, as well as "http://simon.chorechum.click"
#### Using Caddy
Command to remote shell (make sure key pair file is done as file path): ssh -i [key pair file] ubuntu@[yourdomainnamehere]  
Enter Caddy: cd ~ , then vi Caddyfile  
Change :80 and yourdomain to domain name  
Press escape to stop editing  
To save and exit:   :wq  


## HTML Notes

img command: img src="https//insertlink"  no closing tag  
to create checkboxes: \<label for="checkbox2"\>checkbox2\</label\>  
          <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />  
creat dropdown options: <label for="optgroup">OptGroup: </label>  
        <select id="optgroup" name="varOptGroup">  
          <optgroup label="group1">  
            <option>option1</option>  
            <option selected>option2</option>  
          </optgroup>  
    groups within dropdowns not necessary, just an additional use   


## CSS Notes  
[Bootstrap cheatsheet](https://getbootstrap.com/docs/5.0/examples/cheatsheet/)  

To implement bootstrap:  
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  
    <link href="https://getbootstrap.com/docs/5.1/assets/css/docs.css" rel="stylesheet">  

    

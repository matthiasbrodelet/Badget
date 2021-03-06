//
//  FotoViewController.swift
//  badgetMAIV
//
//  Created by Matthias Brodelet on 3/06/15.
//  Copyright (c) 2015 Brodelet.Matthias. All rights reserved.
//

import UIKit
import Alamofire
import MobileCoreServices
import CoreData

class FotoViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    var imageView:UIImageView!
    let progressBar = CALayer()
    var username:String = "";
    var userData = [NSManagedObject]()
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: NSBundle?){
        
        let fetchRequest = NSFetchRequest(entityName: "User")
        fetchRequest.returnsObjectsAsFaults = false
        let sortNameAscending = NSSortDescriptor(key: "naaam", ascending: true)
        fetchRequest.sortDescriptors = [sortNameAscending]
        let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
        var error:NSError?
        userData = appDelegate.managedObjectContext?.executeFetchRequest(fetchRequest, error: &error) as! [NSManagedObject]
        
        
        for data in userData as [NSManagedObject] {
            
            if((data.valueForKey("naaam")) != nil){
                username = data.valueForKey("naaam")! as! String
            }
            
        }
        
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil);

    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        let imageViewBack = UIImageView(image: UIImage(named: "introVerdedig"))
        self.view.addSubview(imageViewBack)
        
        let button   = UIButton.buttonWithType(UIButtonType.System) as! UIButton
        button.frame = CGRectMake(50, 390, 220, 32)
        button.setBackgroundImage(UIImage(named: "btn"), forState: UIControlState.Normal)
        button.setTitle("Challenge Starten", forState: UIControlState.Normal)
        button.setTitleColor(UIColor.whiteColor(), forState: UIControlState.Normal)
        button.addTarget(self, action: "buttonAction:", forControlEvents: UIControlEvents.TouchUpInside)
        self.view.addSubview(button)
        
        let backbutton   = UIButton.buttonWithType(UIButtonType.System) as! UIButton
        backbutton.frame = CGRectMake(50, 440, 220, 32)
        backbutton.setBackgroundImage(UIImage(named: "btn"), forState: UIControlState.Normal)
        backbutton.setTitle("Terug naar overzicht", forState: UIControlState.Normal)
        backbutton.setTitleColor(UIColor.whiteColor(), forState: UIControlState.Normal)
        backbutton.addTarget(self, action: "buttonActionBack:", forControlEvents: UIControlEvents.TouchUpInside)
        self.view.addSubview(backbutton)
        
        progressBar.frame = CGRect(x: 0, y: 60, width: 0, height: 30)
        progressBar.backgroundColor = UIColor.yellowColor().CGColor
        self.view.layer.addSublayer(progressBar)
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func buttonActionBack(sender:UIButton!)
    {
        self.navigationController!.pushViewController(ChallengeViewController(), animated: true)
    
    }
    
    func buttonAction(sender:UIButton!)
    {
        
        
        println("foto tapped1")
        
        if ( UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.Camera) ){
            //				camera available check
            println("Camera beschikbaar")
            
            let picker = UIImagePickerController()
            picker.delegate = self
            var mediaTypes: Array<AnyObject> = [kUTTypeImage]
            picker.mediaTypes = mediaTypes
            picker.sourceType = UIImagePickerControllerSourceType.Camera
            
            self.presentViewController(picker, animated: true, completion: nil)
            
            
        } else {
            
            println("geen cam beschikbaar")
            
            let picker = UIImagePickerController()
            picker.mediaTypes = UIImagePickerController.availableMediaTypesForSourceType(UIImagePickerControllerSourceType.PhotoLibrary)!
            
            picker.sourceType = UIImagePickerControllerSourceType.PhotoLibrary
            picker.delegate = self
            
            self.presentViewController(picker, animated: true, completion: nil)
            
        }

    }
    
    func urlRequestWithComponents(urlString:String, parameters:Dictionary<String, String>, imageData:NSData) -> (URLRequestConvertible, NSData) {
        
        // create url request to send
        var mutableURLRequest = NSMutableURLRequest(URL: NSURL(string: urlString)!)
        mutableURLRequest.HTTPMethod = Alamofire.Method.POST.rawValue
        let boundaryConstant = "myRandomBoundary12345";
        let contentType = "multipart/form-data;boundary="+boundaryConstant
        mutableURLRequest.setValue(contentType, forHTTPHeaderField: "Content-Type")
        
        // create upload data to send
        let uploadData = NSMutableData()
        
        // add image
        uploadData.appendData("\r\n--\(boundaryConstant)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData("Content-Disposition: form-data; name=\"file\"; filename=\"file.png\"\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData("Content-Type: image/png\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData(imageData)
        
        // add parameters
        for (key, value) in parameters {
            uploadData.appendData("\r\n--\(boundaryConstant)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
            uploadData.appendData("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n\(value)".dataUsingEncoding(NSUTF8StringEncoding)!)
        }
        uploadData.appendData("\r\n--\(boundaryConstant)--\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        
        
        // return URLRequestConvertible and NSData
        return (Alamofire.ParameterEncoding.URL.encode(mutableURLRequest, parameters: nil).0, uploadData)
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [NSObject : AnyObject]){
        println("foto genomen")
        
        
        
        let gekozenImage = info[UIImagePickerControllerOriginalImage] as! UIImage
        
        println(gekozenImage);
        
        
        
        // init paramters Dictionary
        var parameters = [
            "username": self.username,
            "variable1": "var"
        ]
        
        // example image data
        let image = gekozenImage
        let imageData = image.mediumQualityJPEGNSData
        //let imageData = UIImagePNGRepresentation(image)
        
        // CREATE AND SEND REQUEST ----------
        
        //let urlRequest = urlRequestWithComponents("http://192.168.0.114/2014-2015/MAIV/Badget/Badget/site/api/photos", parameters: parameters, imageData: imageData)
        let urlRequest = urlRequestWithComponents("http://student.howest.be/matthias.brodelet/20142015/MA4/BADGET/api/photos", parameters: parameters, imageData: imageData)
        
        Alamofire.upload(urlRequest.0, urlRequest.1)
            .progress { (bytesWritten, totalBytesWritten, totalBytesExpectedToWrite) in
                println("\(totalBytesWritten) / \(totalBytesExpectedToWrite)")
                var progress:Double = Double(totalBytesWritten)/Double(totalBytesExpectedToWrite)*100;
                println("progress is \(progress)")
                var progressData = progress*3.2;
        
                self.progressBar.frame = CGRect(x:0, y: 60, width: progressData, height: 30);
                
            }
            .responseJSON { (request, response, JSON, error) in
                println("REQUEST \(request)")
                println("RESPONSE \(response)")
                println("JSON \(JSON)")
                println("ERROR \(error)")
                picker.dismissViewControllerAnimated(true, completion: nil)
        }
        
        let resultFoto = ResultaatFotoViewController()
        resultFoto.dataFromImage = gekozenImage
        
        self.navigationController!.pushViewController(resultFoto,animated: true)
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

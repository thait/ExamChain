pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2; 

contract ExamChain {

struct Exam{
    string ID;
    string Name;
    string ScoreDetail;
    string Score;
}

struct Student
{
    string Name;
    string Email;
    string Phone;
}

mapping(address=>Student) ManageStudent;
mapping(address=>Exam[]) ManageExam;
 
constructor() public
{
    
}

function Registration(string _name,string _email, string _phone) public 
{ 
    ManageStudent[msg.sender] = Student(_name,_email,_phone);
}
    
function SubmitExam(string _id,string _name,string _scoreDetail,string _score) public
{
    ManageExam[msg.sender].push(Exam(_id,_name,_scoreDetail,_score));
}

function GetResult() public view returns(Exam[])
{
    return ManageExam[msg.sender];
}

}
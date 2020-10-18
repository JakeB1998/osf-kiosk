<?php
class Statement{
    private $statement;

    public function __construct($statement_local = null){
        $this->statement = $statement_local;
        
    }
    public function get_statement(){
        return $this->statement;
    }

    public function select($idArray = null){
        $this->statement .= "SELECT ";
        if ($idArray != null){
            if (sizeof($idArray) == 1){
                $this->statement .= strval($idArray[0]) . " ";
            }
            else{
                $this->statement .= " (";
                for ($i = 0;$i < sizeof($idArray); $i++){
                    //finish
                }
                $this->statement .= ") ";
            }
        }
        else{
            $this->statement .= "* ";
        }
        return $this;
    }

    public function from(){
        $this->statement .= "FROM ";
        return $this;
    }
    public function where($id = null){
        $this->statement .= "WHERE " . strval($id);
        return $this;
    }

    public function equals($value = null){
        $this->statement .=  "=" . strval($value);
        return $this;
    }

    public function drop(){
        $this->statement .= "DROP ";
        return $this;
    }

    public function table($tablename = null){
        $this->statement.= $tablename . " ";
        return $this;
    }

    public function if_exists(){
        $this->statement.="IF EXISTS";
        return $this;
    }
}
?>
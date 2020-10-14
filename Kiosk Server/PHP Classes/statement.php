<?php
class Statement{
    private $statement;

    public function __construct($statement_local = null){
        $this->statement = $statement_local;
        
    }
    public function get_statement(){
        return $this->statement;
    }

    public function drop(){
        $this->statement .= "DROP ";
        return $this;
    }

    public function table($tablename = null){
        $this->statement.= $tablename . " ";
        return $this;
    }
}
?>
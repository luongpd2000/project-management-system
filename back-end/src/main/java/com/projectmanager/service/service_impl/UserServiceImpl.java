package com.projectmanager.service.service_impl;

//import com.projectmanager.common.CustomUserDetails;
import com.projectmanager.common.CustomUserDetails;
import com.projectmanager.entity.User;
import com.projectmanager.repository.UserRepository;
import com.projectmanager.service.GeneralService;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if(u == null) {
            throw new UsernameNotFoundException("User not found for username: " + username);
        }
        //return new CustomUserDetails(u);

        Set<GrantedAuthority> authorities = new HashSet<>();

        if(u.getAdmin()){
            System.out.println("admin");
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else {
            System.out.println("user");
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

       return new org.springframework.security.core.userdetails.User(u.getUsername(),
                u.getEncryptedPassword(), authorities);
    }

//    @Override
//    public User createUser(User u) {
//        u.setEncryptedPassword(bCryptPasswordEncoder.encode(u.getPassword()));
//        u.setAdmin(false);
//        u.setDelete(false);
//        u.setCreateDate(Date.valueOf(LocalDate.now()));
//        return userRepository.save(u);
//    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Page findByCreateUser(Long id, Pageable pageable) {
        return null;
    }

//    @Override
//    public List<User> findAll() {
//        return userRepository.findAll();
//    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public User create(User u) {
        u.setEncryptedPassword(bCryptPasswordEncoder.encode(u.getPassword()));
        u.setAdmin(false);
        u.setDelete(false);
        u.setCreateDate(Date.valueOf(LocalDate.now()));
        return userRepository.save(u);
    }

    @Override
    public boolean update(User user) {
        return false;
    }

    @Override
    public boolean delete(User user) {
        return false;
    }
}
